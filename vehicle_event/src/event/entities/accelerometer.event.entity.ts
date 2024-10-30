import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "nestTest", name: "accelerometer_event" }) // 데이터베이스 테이블의 이름
export class AccelerometerEntitiy {
	@PrimaryColumn("varchar", {
		name: "Vehicle_Number",
		length: 20,
		comment: "차량넘버",
	})
	number: string;

	@PrimaryColumn("varchar", {
		name: "GPS_Latitude",
		length: 10,
		comment: "위도 ddmm.mmmm",
	})
	latitude: string;

	@PrimaryColumn("varchar", {
		name: "GPS_Longitude",
		length: 10,
		comment: "경도 dddmm.mmmm",
	})
	longitude: string;

	@PrimaryColumn("datetime", {
		name: "Brake_ON_GPS_DateTime",
		comment: "브레이크ON 시작된 시각",
	})
	ontime: Date;

	@PrimaryColumn("int", {
		name: "Brake_ON_Event_Interval",
		comment: "브레이크ON-감속이벤트 인터벌",
	})
	interval: number;

	@Column("float", {
		name: "Deceleration",
		comment: "- 가속도(측정)",
		nullable: true,
	})
	deceleration: number;

	@Column("smallint", {
		name: "Speed",
		unsigned: true,
		comment: "차량속도(OBD2)",
		nullable: true,
	})
	speed: number;

	@Column("int", {
		name: "Distance_Traveled",
		unsigned: true,
		comment: "주행거리(OBD2)",
		nullable: true,
	})
	distanceTraveled: number;

	@PrimaryColumn("datetime", {
		name: "Logging_DateTime",
		comment: "DBMS 시각",
	})
	logtime: Date;

	@Column("int", {
		name: "Check_Interval",
		unsigned: true,
		comment: "가속도측정 간격",
		nullable: true,
	})
	checkInterval: number;

	@Column("float", {
		name: "Calc_Value",
		comment: "계산된 가/감속 값(뷰어 사용할 강도)",
		nullable: true,
	})
	calcValue: number;

	@Column("smallint", {
		name: "GPS_Speed",
		unsigned: true,
		comment: "gps 속도",
		nullable: true,
		default: "0",
	})
	gpsSpeed: number;
}
