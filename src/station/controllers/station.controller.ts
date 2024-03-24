import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Station } from '../entities/station.entity';
import { StationService } from '../services/station.service';

@Controller('stations')
export class ControllersController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  async findAll(): Promise<Station[]> {
    return this.stationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Station> {
    return this.stationService.findOne(+id);
  }

  @Post()
  async create(@Body() stationData: Partial<Station>): Promise<Station> {
    return this.stationService.create(stationData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() stationData: Partial<Station>,
  ): Promise<Station> {
    return this.stationService.update(+id, stationData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.stationService.remove(+id);
  }
}
