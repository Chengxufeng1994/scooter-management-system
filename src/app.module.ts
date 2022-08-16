import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScooterModule } from './scooter/scooter.module';

@Module({
  imports: [ScooterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
