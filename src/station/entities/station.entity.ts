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

  @Column({ nullable: true })
  @ApiProperty()
  company_id: number;

  @ManyToOne(() => Company, (company) => company.stations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
