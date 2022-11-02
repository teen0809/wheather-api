import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from "@nestjs/axios";

import { TasksService } from './tasks.service';
import { TimingModule } from '../timing/timing.module';
import { ObservationModule } from 'src/observation/observation.module';

@Module({
  imports: [
    TimingModule,
    HttpModule,
    ObservationModule,
    ScheduleModule.forRoot(),
  ],
  providers: [TasksService, Logger]
})
export class TasksModule {}
