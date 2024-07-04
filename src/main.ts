import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('reservation-api')
    .setDescription('用于接口文档')
    .setVersion('1.0')
    .addTag('example')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options)
  
  // app.useGlobalFilters(new ErrorFilter()) //TOPERF
  
  SwaggerModule.setup('api',app,document)
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
