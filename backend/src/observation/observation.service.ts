import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Observation, ObservationDocument } from './observation.schema';
import { ObservationDto } from './observation.dto';

@Injectable()
export class ObservationService {

    constructor(
        @InjectModel(Observation.name)
        private readonly observationModel: Model<ObservationDocument>,
    ){}

    async storeObservatonInfo(observationInfo: ObservationDto) {
        const observation = new this.observationModel(observationInfo);
        return observation.save();
    }

    async getObservationInfo(amount: number) {
        const observationInfoos = await this.observationModel.find().sort({time: -1}).limit(amount).exec();
        return observationInfoos as ObservationDto[];
    }
}
