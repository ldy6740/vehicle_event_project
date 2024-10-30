import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "brake_event" }) // 데이터베이스 테이블의 이름
export class BrakeEntitiy {
	@PrimaryColumn({
		name: "Vehicle_Number",
		type: "varchar",
		length: 20,
		comment: "차량넘버",
	})
	Vehicle_Number: string;

	@PrimaryColumn({
		name: "GPS_Latitude",
		type: "varchar",
		length: 10,
		comment: "위도 ddmm.mmmm",
	})
	GPS_Latitude: string;

	@PrimaryColumn({
		name: "GPS_Longitude",
		type: "varchar",
		length: 10,
		comment: "경도 dddmm.mmmm",
	})
	GPS_Longitude: string;

	@PrimaryColumn({
		name: "Brake_ON_GPS_DateTime",
		type: "datetime",
		comment: "브레이크ON 시작된 시각",
	})
	Brake_ON_GPS_DateTime: Date;

	@PrimaryColumn({
		name: "Brake_OFF_Event_Interval",
		type: "int",
		comment: "차량넘버",
	})
	Brake_OFF_Event_Interval: number;

	@Column({
		name: "Brake_OFF_GPS_DateTime",
		type: "datetime",
		comment: "브레이크OFF 된 시각",
	})
	Brake_OFF_GPS_DateTime: Date;

	@Column({
		name: "Brake_ON_Speed",
		type: "smallint",
		unsigned: true,
		comment: "브레이크ON 차량속도(OBD2)",
		nullable: true,
	})
	Brake_ON_Speed: number;

	@Column({
		name: "Brake_OFF_Speed",
		type: "smallint",
		unsigned: true,
		comment: "브레이크OFF 차량속도(OBD2)",
		nullable: true,
	})
	Brake_OFF_Speed: number;

	@Column({
		name: "Distance_Traveled",
		type: "int",
		unsigned: true,
		comment: "주행거리(OBD2)",
		nullable: true,
	})
	Distance_Traveled: number;

	@PrimaryColumn({
		name: "Logging_DateTime",
		type: "datetime",
		comment: "DBMS 시각",
	})
	Logging_DateTime: Date;

	@Column({
		name: "Calc_Value",
		type: "float",
		comment: "계산된 가/감속 값(뷰어 사용할 강도)",
		nullable: true,
	})
	Calc_Value: number;

	@Column({
		name: "GPS_Speed",
		type: "smallint",
		unsigned: true,
		comment: "gps 속도",
		nullable: true,
		default: "0",
	})
	GPS_Speed: number;
}
