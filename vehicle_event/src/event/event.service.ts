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
		starttime: string,
		endtime: string,
	) {
		try {
			//this.logger.log(accelerDto);
			//const number = accelerDto.number;
			//const latitude = accelerDto.latitude;
			//const longitude = accelerDto.longitude;

			//this.logger.log(accelerDto);
			let strQuery = `
							SELECT DISTINCT Vehicle_Number, GPS_Latitude, GPS_Longitude
								FROM accelerometer_event
								WHERE Vehicle_Number = '${number}'
							`;
			if (starttime) {
				strQuery += `
							AND Brake_ON_GPS_DateTime >= '${starttime}'
							`;
			}
			if (endtime) {
				strQuery += `
							AND Brake_ON_GPS_DateTime <'${endtime}'
							`;
			}
			// this.logger.log(starttime);
			// this.logger.log(endtime);
			
			// strQuery += `
			// 	GROUP BY Vehicle_Number, GPS_Latitude, GPS_Longitude
			// `
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
