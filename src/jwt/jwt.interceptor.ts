import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // 去掉 "Bearer " 后面的空格

      try {
        const decoded = this.jwtService.verify(token,{secret:'123123'});
        request.user = decoded; // 将解码后的用户信息存储到请求对象中
     
      } catch (err) {
        // 处理 token 验证失败的情况
        console.error(err);
        
      }
    }

    return next.handle();
  }
}
