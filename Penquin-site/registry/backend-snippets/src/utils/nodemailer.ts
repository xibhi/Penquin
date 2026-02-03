import nodemailer from 'nodemailer'
import { google } from 'googleapis'

// Type definitions
interface EmailServiceConfig {
  clientId?: string;
  clientSecret?: string;
  redirectURI?: string;
  refreshToken?: string;
  sendersAddress?: string;
  organizationName?: string;
  minDelay?: number;
  maxRetries?: number;
  retryDelay?: number;
}

interface EmailOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html?: string;
  text?: string;
  content?: string; // Backward compatibility
  attachments?: Array<{
    filename?: string;
    content?: string | Buffer;
    path?: string;
    contentType?: string;
  }>;
  headers?: Record<string, string>;
  priority?: 'High' | 'Normal' | 'Low';
  trackingId?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  accepted?: string[];
  rejected?: string[];
  response?: string;
  error?: string;
}

class EmailService {
  private clientId;
  private clientSecret;
  private redirectURI;
  private refreshToken;
  private sendersAddress;
  private organizationName;
  private oauth2Client: any;
  private lastEmailTime: number = 0;
  private minDelay: number;
  private maxRetries: number;
  private retryDelay: number;

  constructor(config: EmailServiceConfig = {}) {
    this.clientId = config.clientId || process.env.CLIENT_ID || '';
    this.clientSecret = config.clientSecret || process.env.CLIENT_SECRET || '';
    this.redirectURI = config.redirectURI || process.env.REDIRECT_URI || '';
    this.refreshToken = config.refreshToken || process.env.REFRESH_TOKEN || '';
    this.sendersAddress = config.sendersAddress || process.env.SENDERS_ADDRESS || '';
    this.organizationName = config.organizationName || process.env.ORGANIZATION_NAME || 'Vynk'; // or hard code here

    // Configuration
    this.minDelay = config.minDelay || 100;
    this.maxRetries = config.maxRetries || 3;
    this.retryDelay = config.retryDelay || 1000;

    // Validate required environment variables
    this.validateConfig();

    // Initialize OAuth2 client
    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectURI
    );

    this.oauth2Client.setCredentials({ refresh_token: this.refreshToken });
  }

  private validateConfig(): void {
    const requiredVars = [
      { key: 'clientId', name: 'CLIENT_ID' },
      { key: 'clientSecret', name: 'CLIENT_SECRET' },
      { key: 'redirectURI', name: 'REDIRECT_URI' },
      { key: 'refreshToken', name: 'REFRESH_TOKEN' },
      { key: 'sendersAddress', name: 'SENDERS_ADDRESS' }
    ];

    const missingVars = requiredVars.filter(({ key }) => !this[key as keyof this]);

    if (missingVars.length > 0) {
      throw new Error(`Missing required configuration: ${missingVars.map(v => v.name).join(', ')}`);
    }
  }

  private async createTransport(): Promise<nodemailer.Transporter> {
    try {
      const accessToken = await this.oauth2Client.getAccessToken();

      if (!accessToken.token) {
        throw new Error('Failed to obtain access token');
      }

      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: this.sendersAddress,
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          refreshToken: this.refreshToken,
          accessToken: accessToken.token
        },
        // Connection pooling for better performance
        pool: true,
        maxConnections: 5,
        maxMessages: 100
      });
    } catch (error) {
      console.error('Error creating email transporter:', error);
      throw new Error(`Failed to create email transporter: ${(error as Error).message}`);
    }
  }

  private async rateLimitCheck(): Promise<void> {
    const now = Date.now();
    const timeSinceLastEmail = now - this.lastEmailTime;

    if (timeSinceLastEmail < this.minDelay) {
      const waitTime = this.minDelay - timeSinceLastEmail;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    this.lastEmailTime = Date.now();
  }

  // Use this function to send Emails
  async sendEmail(options: EmailOptions, retryCount: number = 0): Promise<EmailResult> {
    try {
      // Validate required options
      if (!options.to || !options.subject) {
        throw new Error('Missing required email options: to, subject');
      }

      // Rate limiting
      await this.rateLimitCheck();

      const transporter = await this.createTransport();

      const mailOptions: nodemailer.SendMailOptions = {
        from: `${this.organizationName} <${this.sendersAddress}>`,
        to: options.to,
        subject: options.subject,
        html: options.html || options.content,
        text: options.text,
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
        headers: {
          'X-Priority': options.priority || 'Normal',
          'X-Mailer': 'EmailService-v2.0',
          ...options.headers
        }
      };

      // Add custom message ID for tracking
      if (options.trackingId) {
        mailOptions.headers = {
          ...mailOptions.headers,
          'X-Tracking-ID': options.trackingId
        };
      }

      const result = await transporter.sendMail(mailOptions);

      console.log(`✅ Email sent successfully to ${options.to} - Message ID: ${result.messageId}`);

      return {
        success: true,
        messageId: result.messageId,
        accepted: result.accepted,
        rejected: result.rejected,
        response: result.response
      };

    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(`❌ Error sending email to ${options.to}:`, errorMessage);

      if (retryCount < this.maxRetries) {
        console.log(`🔄 Retrying email send (${retryCount + 1}/${this.maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * Math.pow(2, retryCount)));
        return this.sendEmail(options, retryCount + 1);
      }

      return {
        success: false,
        error: `Failed to send email after ${this.maxRetries} attempts: ${errorMessage}`
      };
    }
  }

  // Create your email templates here as a function which callls the above 'sendEmail' function or use React Email Templates
}

// Create singleton instance
const emailService = new EmailService();

// Export both the class and instance
export { EmailService, emailService };

// Export types
export type { EmailOptions, EmailResult };