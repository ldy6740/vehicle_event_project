import { Injectable } from "@nestjs/common";
import { InjectRepository, InjectDataSource } from "@nestjs/typeorm";
import { Repository, DataSource, Transaction } from "typeorm";
import { ValidationArrayCodeDto } from "./dto/";
import { AccelerometerEntitiy } from "./entities/";
import { LoggerService } from "../common";

@Injectable()
export class EventService {
	constructor(
		@InjectDataSource() private dataSource: DataSource,
		@InjectRepository(AccelerometerEntitiy)
		private readonly accelerometer: Repository<AccelerometerEntitiy>,
		private readonly logger: LoggerService,
	) {}

	async findAccelerometer(
		number: string,
		firststarttime: string,
		starttime: string,
		endtime: string,
	) {
		try {
			//	다. 제동(브레이크) 누적 감속 값 = sum(calc_value)
			//	마. 감속(가속도계) 누적 감속 값 = sum(calc_value)
			//	바. 주행거리 ==> max(Distance_Traveled) - min(Distance_Traveled)
			//	제동(브레이크) 이벤트 횟수(3단계 경계 값 설정, 강/중/약/계 표시)
			//	감속(가속도계) 이벤트 횟수(3단계 경계 값 설정, 강/중/약/계 표시)

			const strQuery = `
								SELECT	DISTINCT accel.Vehicle_Number, accel.GPS_Latitude, accel.GPS_Longitude, accel.calc_value, 'accel' AS gubun,
										(
											SELECT sum(calc_value)
											FROM accelerometer_event
											WHERE Vehicle_Number = '${number}' AND Brake_ON_GPS_DateTime > '${firststarttime}' AND Brake_ON_GPS_DateTime <= '${endtime}'
										) AS calc_value_sum,
										(
											SELECT max(Distance_Traveled) - min(Distance_Traveled)
											FROM accelerometer_event
											WHERE Vehicle_Number = '${number}' AND Brake_ON_GPS_DateTime > '${firststarttime}' AND Brake_ON_GPS_DateTime <= '${endtime}'
										) AS Distance_Traveled,
										(
											SELECT Step
											FROM value_code AS vcode
											WHERE accel.Calc_Value >= vcode.Min_Value AND accel.Calc_Value < vcode.Max_Value AND vcode.Event = 'accelerometer'
										) AS Calc_Value_Gubun,
										(
											SELECT opacity
											FROM value_code AS vcode
											WHERE accel.Calc_Value >= vcode.Min_Value AND accel.Calc_Value < vcode.Max_Value AND vcode.Event = 'accelerometer'
										) AS Calc_Value_opacity,
										(
											SELECT COUNT(accel.Vehicle_Number)
											FROM accelerometer_event AS accel
											INNER JOIN value_code AS vcode ON
											vcode.Event = 'accelerometer' AND vcode.Step = '강'
											WHERE accel.Vehicle_Number = '${number}' AND accel.Brake_ON_GPS_DateTime > '${firststarttime}' AND accel.Brake_ON_GPS_DateTime <= '${endtime}'
											AND accel.Calc_Value >= vcode.Min_Value AND accel.Calc_Value <= vcode.Max_Value
										) AS Calc_Value_sum1,
										(
											SELECT COUNT(accel.Vehicle_Number)
											FROM accelerometer_event AS accel
											INNER JOIN value_code AS vcode ON
											vcode.Event = 'accelerometer' AND vcode.Step = '중'
											WHERE accel.Vehicle_Number = '${number}' AND accel.Brake_ON_GPS_DateTime > '${firststarttime}' AND accel.Brake_ON_GPS_DateTime <= '${endtime}'
											AND accel.Calc_Value >= vcode.Min_Value AND accel.Calc_Value <= vcode.Max_Value
										) AS Calc_Value_sum2,
										(
											SELECT COUNT(accel.Vehicle_Number)
											FROM accelerometer_event AS accel
											INNER JOIN value_code AS vcode ON
											vcode.Event = 'accelerometer' AND vcode.Step = '약'
											WHERE accel.Vehicle_Number = '${number}' AND accel.Brake_ON_GPS_DateTime > '${firststarttime}' AND accel.Brake_ON_GPS_DateTime <= '${endtime}'
											AND accel.Calc_Value >= vcode.Min_Value AND accel.Calc_Value <= vcode.Max_Value
										) AS Calc_Value_sum3, accel.Brake_ON_GPS_DateTime
								FROM accelerometer_event AS accel
								WHERE accel.Vehicle_Number = '${number}' AND accel.Brake_ON_GPS_DateTime > '${starttime}' AND accel.Brake_ON_GPS_DateTime <= '${endtime}'

								UNION ALL

								SELECT DISTINCT brake.Vehicle_Number, brake.GPS_Latitude, brake.GPS_Longitude, brake.calc_value, 'brake' AS gubun,
										(
											SELECT sum(calc_value)
											FROM brake_event
											WHERE Vehicle_Number = '${number}' AND Brake_ON_GPS_DateTime > '${firststarttime}' AND Brake_ON_GPS_DateTime <= '${endtime}'
										) AS calc_value_sum,
										(
											SELECT max(Distance_Traveled) - min(Distance_Traveled)	
											FROM brake_event
											WHERE Vehicle_Number = '${number}' AND Brake_ON_GPS_DateTime > '${firststarttime}' AND Brake_ON_GPS_DateTime <= '${endtime}'
										) AS Distance_Traveled,
										(
											SELECT Step
											FROM value_code AS vcode
											WHERE brake.Calc_Value >= vcode.Min_Value AND brake.Calc_Value < vcode.Max_Value AND vcode.Event = 'brake'
										) AS Calc_Value_Gubun,
										(
											SELECT opacity
											FROM value_code AS vcode
											WHERE brake.Calc_Value >= vcode.Min_Value AND brake.Calc_Value < vcode.Max_Value AND vcode.Event = 'brake'
										) AS Calc_Value_opacity,
										(
											SELECT COUNT(brake.Vehicle_Number)
											FROM brake_event AS brake
											INNER JOIN value_code AS vcode ON
											vcode.Event = 'brake' AND vcode.Step = '강'
											WHERE brake.Vehicle_Number = '${number}' AND brake.Brake_ON_GPS_DateTime > '${firststarttime}' AND brake.Brake_ON_GPS_DateTime <= '${endtime}'
											AND brake.Calc_Value >= vcode.Min_Value AND brake.Calc_Value <= vcode.Max_Value
										) AS Calc_Value_sum1,
										(
											SELECT COUNT(brake.Vehicle_Number)
											FROM brake_event AS brake
											INNER JOIN value_code AS vcode ON
											vcode.Event = 'brake' AND vcode.Step = '중'
											WHERE brake.Vehicle_Number = '${number}' AND brake.Brake_ON_GPS_DateTime > '${firststarttime}' AND brake.Brake_ON_GPS_DateTime <= '${endtime}'
											AND brake.Calc_Value >= vcode.Min_Value AND brake.Calc_Value <= vcode.Max_Value
										) AS Calc_Value_sum2,
										(
											SELECT COUNT(brake.Vehicle_Number)
											FROM brake_event AS brake
											INNER JOIN value_code AS vcode ON
											vcode.Event = 'brake' AND vcode.Step = '약'
											WHERE brake.Vehicle_Number = '${number}' AND brake.Brake_ON_GPS_DateTime > '${firststarttime}' AND brake.Brake_ON_GPS_DateTime <= '${endtime}'
											AND brake.Calc_Value >= vcode.Min_Value AND brake.Calc_Value <= vcode.Max_Value
										) AS Calc_Value_sum3, brake.Brake_ON_GPS_DateTime
								FROM brake_event AS brake
								WHERE brake.Vehicle_Number = '${number}' AND brake.Brake_ON_GPS_DateTime > '${starttime}' AND brake.Brake_ON_GPS_DateTime <= '${endtime}'
								ORDER BY Brake_ON_GPS_DateTime ASC
								`;
			const rawData = await this.accelerometer.query(strQuery);
			if (rawData.length > 0) {
				//const result = rawData[0]; //하나만 뽑을 때
				return rawData;
			} else {
				return "";
			}
		} catch (error) {
			this.logger.log(error.message);
		}
	}

	async saveCodeValue(arrayCodeDto: ValidationArrayCodeDto) {
		let strQuery = "";
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const items = arrayCodeDto.items;
			items.forEach((element) => {
				strQuery = `
								INSERT INTO value_code
									(Event, Step, Min_Value, Max_Value, opacity) VALUES
									('${element.event}','${element.step}','${element.min}','${element.max}','${element.opacity}')
								ON DUPLICATE KEY UPDATE
									Min_Value				=	'${element.min}',
									Max_Value				=	'${element.max}',
									opacity					=	'${element.opacity}';
								`;
				queryRunner.manager.query(strQuery);
			});
			await queryRunner.commitTransaction();
			this.logger.log("commitTransaction");
			return true;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			this.logger.log("rollbackTransaction");
			this.logger.log(error.message);
			return false;
		} finally {
			await queryRunner.release();
			this.logger.log("release");
		}
	}
}
