import { Controller, Get, Query } from '@nestjs/common';
import { ObservationService } from './observation.service';

@Controller('observation')
export class ObservationController {
    constructor(
        private readonly observationService: ObservationService
    ){}

    @Get()
    async allObservations(@Query('amount') amount: number) {
        const observationInfos = await this.observationService.getObservationInfo(amount);
        return observationInfos;
    }
}
