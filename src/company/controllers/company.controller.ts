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
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'; // Import Swagger decorators
import { CompanyDto } from '../dto/company.dto';
import { Company } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';

@ApiTags('companies') // Add tag for controller
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Create a new company' }) // Add summary for endpoint
  @ApiResponse({
    status: 201,
    description: 'The company has been successfully created.',
    type: Company,
  }) // Add response description
  @ApiBody({ type: CompanyDto }) // Add request body type
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
