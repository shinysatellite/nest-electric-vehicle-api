import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  latitude: number;

  @Column()
  @ApiProperty()
  longitude: number;

  @Column({ name: 'company_id' })
  @ApiProperty()
  companyId: number;

  @Column()
  @ApiProperty()
  address: string;
}
