import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * Custom error response message
     * @param type exception type name
     * @param error exception object
     */
    const responseMessage = (type, error) => {
      response.status(status).json({
        status: status,
        error: {
          path: request.url,
          type: type,
          message: error.response.message,
        },
      });
    };

    responseMessage(exception.name, exception);
  }
}
