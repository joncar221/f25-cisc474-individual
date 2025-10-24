import { Injectable } from '@nestjs/common';
import { CourseCreateIn, CourseUpdateIn, CourseOut } from '@repo/api/courses';
import { PrismaService } from './prisma.service';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}
    async create(createCourseDto: CourseCreateIn): Promise<CourseOut> {
        const newCourse = await this.prisma.course.create({
          data: createCourseDto,
        });
        return {
          title: newCourse.title,
          description: newCourse.description,
          instructorId: newCourse.instructorId,
          id: newCourse.id,
          //createdAt: newCourse.createdAt.toString(),
          //updatedAt: newCourse.updatedAt.toString(),
        };
      }
    
    findAll() {
        return this.prisma.course.findMany();
    }

    findOne(id: string) {
        return this.prisma.course.findUnique({ where: { id }});
    }

    

    update(id: string, updateCourseDto: CourseUpdateIn) {
        return this.prisma.course.update({
        where: { id },
        data: updateCourseDto,
        });
    }

    remove(id: string) {
        return this.prisma.course.delete({
        where: { id },
        });
    }
}