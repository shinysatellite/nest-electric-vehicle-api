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

  @Column({ nullable: true }) // Add this line to define parent_company_id column
  @ApiProperty()
  parent_company_id: number;

  @OneToMany(() => Station, (station) => station.company, {
    onDelete: 'CASCADE',
  }) // One company has many stations
  stations: Station[]; // Define the relationship

  @ManyToOne(() => Company, (parent) => parent.childCompanies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_company_id', referencedColumnName: 'id' })
  parentCompany: Company;

  @OneToMany(() => Company, (child) => child.parentCompany)
  childCompanies: Company[];
}
