import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Express = express();

// Configure CORS middleware
// Restricts API access to specified origins and enables credentials
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// JSON body parser middleware
// Limits request body size to 16kb to prevent large payload attacks
app.use(express.json({limit: '16kb'}));

// URL-encoded body parser middleware
// Handles form submissions and URL-encoded data with extended options
app.use(express.urlencoded({
  extended: true,
  limit: '16kb'
}));

// Static file serving middleware
// Serves static assets from the 'public' directory
app.use(express.static('public'));

// Cookie parser middleware
// Parses Cookie header and populates req.cookies
app.use(cookieParser());

// Import routes

// import userRouter from './routes/user.routes.ts'

// Route declarations

// app.use('/api/v1/users' , userRouter);

export { app }