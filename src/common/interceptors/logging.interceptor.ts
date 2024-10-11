import { HttpService } from '@nestjs/axios';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((resData) => {
        const duration = Date.now() - req['startTime'];
        const loggingData = {
          requestDuration: duration,
          requestData: req.reqData,
          responseData: resData,
          httpStatus: res.statusCode,
        };

        this.httpService.post('http://localhost:8765/logging', loggingData);

        return resData;
      }),
    );
  }
}
