import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { ApolloError } from 'apollo-server-errors';
import { MongoError } from 'mongodb';

const isGraphqlContext = (response: any) => !response.status;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseMessage = exception => {
      if (isGraphqlContext(response)) {
        const message =
          exception instanceof MongoError
            ? exception?.message
            : exception?.response?.message;
        throw new ApolloError(
          message ?? 'An error occurred',
          status.toString(),
        );
      } else {
        response.status(status).json({
          statusCode: status,
          path: request.url,
          errorType: exception?.name ?? 'Error',
          errorMessage: exception?.response?.message ?? exception.message,
        });
      }
    };
    responseMessage(exception);
  }
}
