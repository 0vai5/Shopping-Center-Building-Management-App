
class CustomError extends Error {
  statusCode: number;
  constructor(
    message: string = "Something went wrong",
    statusCode: number = 500
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default CustomError;
