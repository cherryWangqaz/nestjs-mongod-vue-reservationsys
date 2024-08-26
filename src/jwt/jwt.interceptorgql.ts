import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApiException } from '../utils/api.exception';

@Injectable()
export class JwtInterceptorGQL implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if(ctx.getInfo().fieldName == 'login') return next.handle() //login认证接口不做权限限制
    const authHeader = request.headers.authorization;
    if( !authHeader){
      throw new ApiException('未认证',HttpStatus.BAD_REQUEST)
    }
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // 去掉 "Bearer " 后面的空格

      try {
        const decoded = this.jwtService.verify(token,{secret:'123123'});
        request.user = decoded; // 将解码后的用户信息存储到请求对象中
     
      } catch (err) {
        // 处理 token 验证失败的情况
        throw new ApiException('认证出错',HttpStatus.BAD_REQUEST)

        console.error(err);
        
      }
    }

    return next.handle();
  }
}
