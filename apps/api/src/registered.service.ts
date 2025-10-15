import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class RegisteredService {
    constructor(private prisma: PrismaService) {}
    
    findAll() {
        return this.prisma.registered.findMany();
    }

    findOne(id: string) {
        return this.prisma.registered.findUnique({ where: { id }});
    }

}