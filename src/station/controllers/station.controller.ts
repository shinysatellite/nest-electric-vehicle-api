import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StationDto } from '../dto/station.dto';
import { Station } from '../entities/station.entity';
import { StationService } from '../services/station.service';

@Controller('stations')
@ApiTags('stations')
export class ControllersController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all stations',
    description: 'Retrieve a list of all stations.',
  })
  @ApiResponse({
    status: 200,
    description: 'Stations retrieved successfully.',
    type: [Station],
  })
  async findAll(): Promise<Station[]> {
    return this.stationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get station by ID',
    description: 'Retrieve a station by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Station retrieved successfully.',
    type: Station,
  })
  async findOne(@Param('id') id: string): Promise<Station> {
    return this.stationService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new station',
    description: 'Create a new station with provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Station created successfully.',
    type: Station,
  })
  @ApiBadRequestResponse({ description: 'Invalid station data provided.' })
  async create(
    @Body(new ValidationPipe()) CreateStationDto: StationDto,
  ): Promise<Station> {
    return this.stationService.create(CreateStationDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a station',
    description: 'Update an existing station with provided data.',
  })
  async update(
    @Param('id') id: string,
    @Body() stationData: Partial<Station>,
  ): Promise<Station> {
    return this.stationService.update(+id, stationData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a station',
    description: 'Delete a station by its ID.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.stationService.remove(+id);
  }
}
