import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ZodError } from 'zod';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((error) =>
        throwError(() => this.errorHandler(error, context)),
      ),
    );
  }

  errorHandler(error: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (!response.headersSent) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((e) => `${e.path.join('.')} attribute: ${e.message}`)
          .join(', ');
        response.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          statusCode: HttpStatus.BAD_REQUEST,
          path: request.url,
          message: errorMessage,
          data: null,
        });
      } else if (error instanceof HttpException) {
        response.status(error.getStatus()).json({
          status: false,
          statusCode: error.getStatus(),
          path: request.url,
          message: error.message,
          data: null,
        });
      }
    }
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = response.statusCode;

    return {
      status: true,
      path: request.url,
      statusCode,
      data: res,
    };
  }
}
