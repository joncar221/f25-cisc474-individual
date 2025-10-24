import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseRef, CourseUpdateIn, CourseCreateIn } from '@repo/api/courses';
import { ZodPipe } from 'src/zod_pipe';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    console.log('User accessed:', user);
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CourseUpdateIn) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  //@UsePipes(new ZodPipe(CourseCreateIn))
  // Unfortunately, a bug in Zod causes this to crash with heap out of memory
  // But at least we get some compile-time type-safety, if not runtime validation
  create(
    @Body() createCourseDto: CourseCreateIn,
    @CurrentUser() user: JwtUser,
  ) {
    createCourseDto.instructorId = user.userId;
    return this.coursesService.create(createCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}