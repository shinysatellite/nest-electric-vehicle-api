import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as geolib from 'geolib';
import { Station } from 'src/station/entities/station.entity';
import { Repository } from 'typeorm';
import { CompanyDto } from '../dto/company.dto';
import { Company } from '../entities/company.entity';
import { CompanyWithMappedStation, StationWithDistance } from '../types';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
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

  async getCompanyHierarchy(
    companyId: number,
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<CompanyWithMappedStation> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['childCompanies', 'stations'],
    });

    const mappedCompany: CompanyWithMappedStation = {
      ...company,
      groupedStations: {},
    };

    if (!mappedCompany) {
      return null;
    }
    await this.fetchChildCompanies(mappedCompany, latitude, longitude, radius);

    return mappedCompany;
  }

  private async fetchChildCompanies(
    company: CompanyWithMappedStation,
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<void> {
    if (!company.childCompanies || company.childCompanies.length === 0) {
      return;
    }

    for (const childCompany of company.childCompanies) {
      const childCompanies: CompanyWithMappedStation[] =
        await this.companyRepository.find({
          where: { parent_company_id: childCompany.id },
          relations: ['childCompanies'],
        });
      await this.fetchStations(childCompany, latitude, longitude, radius);

      await this.fetchChildCompanies(childCompany, latitude, longitude, radius);
      childCompany.childCompanies = childCompanies;
    }
  }

  private async fetchStations(
    company: CompanyWithMappedStation,
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<void> {
    const stations: StationWithDistance[] = await this.stationRepository.find({
      where: { company_id: company.id },
    });

    const stationsWithinRadius: StationWithDistance[] = stations
      .filter((station) => {
        const distance = geolib.getDistance(
          { latitude: station.latitude, longitude: station.longitude },
          { latitude, longitude },
        );
        station.distanceFromPoint = distance;
        return distance <= radius;
      })
      .sort((stationA, stationB) => {
        return stationA.distanceFromPoint - stationB.distanceFromPoint; // Sort by increasing distance
      });

    const groupedStations = this.groupStationsByLocation(stationsWithinRadius);
    company.groupedStations = groupedStations;
  }

  private groupStationsByLocation(stations: Station[]): {
    [key: string]: Station[];
  } {
    const groupedStations: { [key: string]: Station[] } = {};
    stations.forEach((station) => {
      const key = `${station.latitude},${station.longitude}`;
      if (!groupedStations[key]) {
        groupedStations[key] = [];
      }
      groupedStations[key].push(station);
    });
    return groupedStations;
  }

  async getCompanyIdsFromHierarchy(
    companyId: number,
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<number[]> {
    const hierarchy = await this.getCompanyHierarchy(
      companyId,
      latitude,
      longitude,
      radius,
    );
    const companyIds: number[] = [];

    this.collectCompanyIds(hierarchy, companyIds);

    return companyIds;
  }

  collectCompanyIds(company: Company, companyIds: number[]): void {
    companyIds.push(company.id);

    if (company.childCompanies && company.childCompanies.length > 0) {
      for (const childCompany of company.childCompanies) {
        this.collectCompanyIds(childCompany, companyIds);
      }
    }
  }
}
