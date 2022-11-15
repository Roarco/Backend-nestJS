import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // <-- remove all properties that are not defined in the DTO
      forbidNonWhitelisted: true, // <-- throw an error if a property is not defined in the DTO
      transformOptions: {
        enableImplicitConversion: true, // <-- convert string to numbers and dates
      },
    }),
  );

  /* configuration for swagger */
  const config = new DocumentBuilder()
    .setTitle('Platzi Store API')
    .setDescription('The Platzi Store API for the course')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
