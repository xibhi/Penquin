class ApiResponse {
  statusCode: number;
  data: Record<string, unknown> | null;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: Record<string, unknown> | null, message = "Success") {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
  }
}

export { ApiResponse }