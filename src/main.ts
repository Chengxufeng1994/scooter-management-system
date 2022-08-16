import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Scooter example')
    .setDescription('The scooter API description')
    .setVersion('1.0')
    .addTag('scooter')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  const PORT = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(PORT);
}
bootstrap();
