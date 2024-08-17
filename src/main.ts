import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Apply validation globally
   app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that do not have any decorators
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));
  const config = new DocumentBuilder().setTitle('EASY-BOOK-API')
    .setDescription('the description of the api')
    .setVersion('1.0')
    .build()
  const Document= SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('/DOC',app,Document)
  await app.listen(3000);
}
bootstrap();
