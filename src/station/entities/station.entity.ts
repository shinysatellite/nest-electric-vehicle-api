import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ type: 'float' })
  @ApiProperty()
  latitude: number;

  @Column({ type: 'float' })
  @ApiProperty()
  longitude: number;

  @Column()
  @ApiProperty()
  address: string;

  @ManyToOne(() => Company, (company) => company.stations)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
