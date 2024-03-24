import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('stations')
export class ControllersController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
