import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersController } from './controllers/station.controller';
import { Station } from './entities/station.entity';
import { StationService } from './services/station.service';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  controllers: [ControllersController],
  providers: [StationService],
})
export class StationModule {}
