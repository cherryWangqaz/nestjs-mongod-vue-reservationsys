import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module';
// import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';;
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtInterceptor } from './jwt/jwt.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'

@Module({
  imports: [ 
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname,"../frontend/dist")
    }),
    StoreModule.init(),
    OrderModule,
    UserModule,
    JwtModule.register({
      secret:'123123',
      signOptions:{expiresIn:'10m'}
    })
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass:JwtInterceptor}],
})
export class AppModule {}
