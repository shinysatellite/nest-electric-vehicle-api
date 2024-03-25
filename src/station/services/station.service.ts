import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationDto } from '../dto/station.dto';
import { Station } from '../entities/station.entity';
@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }

  async findOne(id: number): Promise<Station> {
    return this.stationRepository.findOne({ where: { id } });
  }

  async create(stationData: StationDto): Promise<Station> {
    const station = this.stationRepository.create(stationData);
    return this.stationRepository.save(station);
  }

  async update(id: number, stationData: Partial<Station>): Promise<Station> {
    await this.stationRepository.update(id, stationData);
    return this.stationRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.stationRepository.delete(id);
  }
}
