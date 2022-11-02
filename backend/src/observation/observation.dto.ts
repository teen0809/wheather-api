export interface ObservationDto {
  time: Date;
  wheather_code: string;
  temperature: number;
  dew_point: number;
  feels_like: number;
  wind_direction: string;
  wind_speed: number;
  wind_gust: number;
  relative_humidity: number;
  pressure_value: number;
  pressure_trend: number;
  visibility: number;
  ceiling: number;
}
  