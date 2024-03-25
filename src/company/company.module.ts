import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from './controllers/company.controller';
import { Company } from './entities/company.entity';
import { CompanyService } from './services/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
