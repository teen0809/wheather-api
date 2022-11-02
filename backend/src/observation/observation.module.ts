import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ObservationService } from './observation.service';
import { Observation, ObservationSchema } from './observation.schema';
import { ObservationController } from './observation.controller';

const modelDefinitions = [{ name: Observation.name, schema: ObservationSchema }];

@Module({
  imports: [
    MongooseModule.forFeature(modelDefinitions),
  ],
  providers: [ObservationService, Logger],
  exports: [ObservationService],
  controllers: [ObservationController]
})
export class ObservationModule {}
