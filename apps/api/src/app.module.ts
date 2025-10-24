import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users.module';
import { CoursesModule } from './courses.module';
import { AssignmentsModule } from './assignments.module';
import { RegisteredModule } from './registered.module';
import { SubmissionsModule } from './submissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LinksModule, UsersModule, CoursesModule, AssignmentsModule, RegisteredModule, SubmissionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
