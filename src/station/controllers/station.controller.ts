import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Station } from '../entities/station.entity';
import { StationService } from '../services/station.service';

@Controller('stations')
@ApiTags('stations')
export class ControllersController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  async findAll(): Promise<Station[]> {
    return this.stationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get station by ID' })
  @ApiResponse({
    status: 200,
    description: 'The station has been successfully retrieved.',
    type: Station,
  })
  async findOne(@Param('id') id: string): Promise<Station> {
    return this.stationService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new station' })
  @ApiResponse({
    status: 201,
    description: 'The station has been successfully created.',
    type: Station,
  })
  @ApiBadRequestResponse({ description: 'Invalid station data provided.' })
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
