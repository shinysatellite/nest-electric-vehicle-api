import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'; // Import Swagger decorators
import { CompanyDto } from '../dto/company.dto';
import { Company } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Create a new company' }) // Add summary for endpoint
  @ApiResponse({
    status: 201,
    description: 'The company has been successfully created.',
    type: Company,
  })
  @ApiBody({ type: CompanyDto })
  @Post()
  async create(@Body() createCompanyDto: CompanyDto): Promise<Company> {
    return await this.companyService.create(createCompanyDto);
  }

  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({
    status: 200,
    description: 'Returns all companies.',
    type: Company,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @Get('find-with-hierachy')
  async findAllWithHierachy(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
    @Query('companyId') companyId?: number,
  ) {
    const companyHierarchy = await this.companyService.getCompanyHierarchy(
      companyId,
      latitude,
      longitude,
      radius,
    );

    return companyHierarchy;
  }

  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the company.',
    type: Company,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Company> {
    return await this.companyService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiBody({ type: CompanyDto })
  @ApiResponse({
    status: 200,
    description: 'The company has been successfully updated.',
    type: Company,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: CompanyDto,
  ): Promise<Company> {
    return await this.companyService.update(+id, updateCompanyDto);
  }

  @ApiOperation({ summary: 'Delete a company by ID' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({
    status: 200,
    description: 'The company has been successfully deleted.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.companyService.remove(+id);
  }
}
