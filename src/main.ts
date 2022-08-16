import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json());
  app.setGlobalPrefix('api/v1');
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(PORT);
}
bootstrap();
