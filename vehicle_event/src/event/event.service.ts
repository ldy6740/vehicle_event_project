import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccelerDto } from "./dto/";
import { AccelerometerEntitiy } from "./entities/";
import { LoggerService } from "../common";

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(AccelerometerEntitiy)
		private readonly accelerometer: Repository<AccelerometerEntitiy>,
		private readonly logger: LoggerService,
	) {}

	async findAccelerometer(
		number: string,
		latitude: string,
		longitude: string,
		ontime: string,
		interval: number,
		logtime: string,
	) {
		try {
			//this.logger.log(accelerDto);
			//const number = accelerDto.number;
			//const latitude = accelerDto.latitude;
			//const longitude = accelerDto.longitude;

			//this.logger.log(accelerDto);
			let strQuery = `
							SELECT Vehicle_Number, GPS_Latitude, GPS_Longitude, Brake_ON_GPS_DateTime, Brake_ON_Event_Interval, Deceleration, Speed, Distance_Traveled, Logging_DateTime, Check_Interval, Calc_Value, GPS_Speed
								FROM accelerometer_event
								WHERE Vehicle_Number = '${number}'
							`;
			if (latitude) {
				strQuery += `
							AND GPS_Latitude = '${latitude}'
							`;
			}
			if (longitude) {
				strQuery += `
							AND GPS_Longitude = '${longitude}'
							`;
			}
			if (ontime) {
				strQuery += `
							AND Brake_ON_GPS_DateTime >= '${ontime}'
							`;
			}
			if (interval > 0) {
				strQuery += `
							AND Brake_ON_Event_Interval = '${interval}'
							`;
			}
			if (logtime) {
				strQuery += `
							AND Logging_DateTime >= '${logtime}'
							`;
			}
			this.logger.log(strQuery);
			const rawData = await this.accelerometer.query(strQuery);
			if (rawData.length !== 0) {
				//const result = rawData[0]; //하나만 뽑을 때
				return rawData;
			} else {
				return "";
			}
		} catch (error) {
			this.logger.log(error.message);
		}
	}
}
