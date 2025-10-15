import { Controller, Get } from '@nestjs/common';
import { RegisteredService } from './registered.service';

@Controller('registered')
export class RegisteredController {
  constructor(private readonly registeredService: RegisteredService) {}

  @Get()
  findAll() {
    return this.registeredService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.registeredService.findOne(id);
  }

}
