import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  parent_company_id: number;
}
