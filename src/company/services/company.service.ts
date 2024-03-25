import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDto } from '../dto/company.dto';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CompanyDto): Promise<Company> {
    const newCompany = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(newCompany);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    return await this.companyRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCompanyDto: CompanyDto): Promise<Company> {
    const companyToUpdate = await this.companyRepository.findOne({
      where: { id },
    });
    if (!companyToUpdate) {
      throw new Error('Company not found');
    }
    const updatedCompany = Object.assign(companyToUpdate, updateCompanyDto);
    return await this.companyRepository.save(updatedCompany);
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
