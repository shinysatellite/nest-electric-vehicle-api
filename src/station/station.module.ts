import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersController } from './controllers/station.controller';
import { Station } from './entities/station.entity';
import { ServicesService } from './services/services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  controllers: [ControllersController],
  providers: [ServicesService],
})
export class StationModule {}
