import { Module } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { ScooterController } from './scooter.controller';
import { DatabaseModule } from '../database/database.module';
import { scooterProviders } from './scooter.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ScooterController],
  providers: [...scooterProviders, ScooterService],
})
export class ScooterModule {}
