// api.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(
    public readonly message: string,
    public readonly statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(message,statusCode);
    // Object.setPrototypeOf(this, ApiException.prototype);
  }

  public getStatus(){
    return 200
  }

  public getResponse() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      timestamp: new Date().toISOString(),
    };
  }
}
