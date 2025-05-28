interface ApiResponse {
  status: number;
  message: string;
  data?: any;
}

class ApiResponse {
  status: number;
  constructor(status: number, message: string = "", data:any = []) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;