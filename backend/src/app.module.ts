import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { TasksModule } from './tasks/tasks.module';
import { TimingModule } from './timing/timing.module';
import { ObservationModule } from './observation/observation.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TasksModule,
    TimingModule,
    ObservationModule,
  ],
})
export class AppModule {}
