import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "timer_event" }) // 데이터베이스 테이블의 이름
export class TimerEntitiy {
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
		name: "GPS_DateTime",
		type: "datetime",
		comment: "GPS 시각",
	})
	GPS_DateTime: Date;

	@Column({
		name: "Speed",
		type: "int",
		unsigned: true,
		comment: "차량속도(OBD2)",
		nullable: true,
	})
	Speed: number;

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
		name: "GPS_Speed",
		type: "smallint",
		unsigned: true,
		comment: "gps 속도",
		default: "0",
	})
	GPS_Speed: number;
}
