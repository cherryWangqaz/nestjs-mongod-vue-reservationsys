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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtInterceptorGQL } from './jwt/jwt.interceptorgql';

@Module({
  imports: [ 
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname,"../frontend/dist"),
      exclude: ['/graphql']
    }),
    StoreModule.init(),
    OrderModule,
    UserModule,
    JwtModule.register({
      secret:'123123',
      signOptions:{expiresIn:'10m'}
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(),'src/schema.gql'),
      context: ({req})=>{

      }
    })
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass:JwtInterceptor
    },{
      provide: APP_INTERCEPTOR,
      useClass: JwtInterceptorGQL
    }
  ],
})
export class AppModule {}
