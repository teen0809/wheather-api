import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObservationDocument = Observation & Document;

@Schema()
export class Observation {
  @Prop()
  time: Date;

  @Prop({ required: true })
  wheather_code: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  dew_point: number;

  @Prop({ required: true })
  feels_like: number;

  @Prop({ required: true })
  wind_direction: string;

  @Prop({ required: true })
  wind_speed: number;

  @Prop({ required: true })
  wind_gust: number;

  @Prop({ required: true })
  relative_humidity: number;

  @Prop({ required: true })
  pressure_value: number;

  @Prop({ required: true })
  pressure_trend: number;

  @Prop({ required: true })
  visibility: number;

  @Prop({ required: true })
  ceiling: number;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation);
