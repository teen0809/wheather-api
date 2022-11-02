import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { ObservationService } from 'src/observation/observation.service';

import { TimingService } from 'src/timing/timing.service';
import { map } from 'rxjs';
import { ObservationDto } from 'src/observation/observation.dto';

@Injectable()
export class TasksService {
    private readonly WHEATHER_API_URL: string;
    
    constructor(
        private readonly logger: Logger,
        private readonly env: ConfigService,
        private readonly timingService: TimingService,
        private readonly httpsService: HttpService,
        private readonly observationService: ObservationService,
    ) {
        this.WHEATHER_API_URL = this.env.get('WHEATHER_API_URL');
    }

    @Cron(CronExpression.EVERY_HOUR, {timeZone: 'America/New_York'})
    async updateObservation() {
        this.logger.log('Updating stations and weather info');
        const currentDate = new Date();
        try {
            // TODO: Consider using Promise.all
            await this.timingService.measure(
              this.updateObservationInfo,
              this,
              currentDate,
            );
          } catch (err) {
            this.logger.error(`Problem updating information: ${err}`);
          }
    }

    async updateObservationInfo() {
        const res = await this.getObservationInfo();
        const observation: ObservationDto = {
            time: res.time.utc,
            wheather_code: res.weatherCode.value,
            temperature: res.temperature,
            dew_point: res.dewPoint,
            feels_like: res.feelsLike,
            wind_direction: res.wind.direction,
            wind_speed: res.wind.speed,
            wind_gust: res.wind.gust,
            relative_humidity: res.relativeHumidity,
            pressure_value: res.pressure.value,
            pressure_trend: res.pressure.trend,
            visibility: res.visibility,
            ceiling: res.ceiling
        }
        await this.observationService.storeObservatonInfo(observation);
    }

    async getObservationInfo() {
        const res = await this.httpsService.get(this.WHEATHER_API_URL).toPromise();
        return res.data;
    }
}
