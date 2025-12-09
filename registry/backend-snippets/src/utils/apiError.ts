class ApiError extends Error {
  statusCode: number;
  message: string;
  success: boolean;
  errors: string[];
  
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: string[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}

export { ApiError }