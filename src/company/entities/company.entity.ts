import { ApiProperty } from '@nestjs/swagger';
import { Station } from 'src/station/entities/station.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Station, (station) => station.company) // One company has many stations
  stations: Station[]; // Define the relationship

  @ManyToOne(() => Company, (parent) => parent.childCompanies)
  @JoinColumn({ name: 'parent_company_id' })
  parentCompany: Company;

  @OneToMany(() => Company, (child) => child.parentCompany)
  childCompanies: Company[];
}
