import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseRef, CourseUpdateIn, CourseCreateIn } from '@repo/api/courses';
import { ZodPipe } from 'src/zod_pipe';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CourseUpdateIn) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Post()
  create(@Body() createCourseDto: CourseCreateIn) {
    return this.coursesService.create(createCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

}

