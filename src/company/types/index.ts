import { Station } from 'src/station/entities/station.entity';
import { Company } from '../entities/company.entity';

export interface StationWithDistance extends Station {
  distanceFromPoint?: number;
}

export interface CompanyWithMappedStation extends Company {
  groupedStations?: { [key: string]: Station[] };
}
