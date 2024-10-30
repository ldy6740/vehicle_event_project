import { ApiProperty } from "@nestjs/swagger";
import {
	IsNotEmpty,
	IsString,
	IsInt,
	IsDateString,
	IsOptional,
} from "class-validator";

export class AccelerDto {
	@ApiProperty({ example: "12가3456", description: "차량번호" })
	@IsNotEmpty()
	@IsString()
	number: string;

	@ApiProperty({ example: "35.482044", description: "위도 ddmm.mmmm" })
	@IsOptional()
	@IsString()
	latitude: string;

	@ApiProperty({ example: "129.351166", description: "경도 dddmm.mmmm" })
	@IsOptional()
	@IsString()
	longitude: string;

	@ApiProperty({
		example: "2024-10-25 15:06:06",
		description: "브레이크ON 시작된 시각",
	})
	@IsOptional()
	//@IsDateString()
	@IsString()
	ontime: string;

	@ApiProperty({
		example: "14268",
		description: "브레이크ON-감속이벤트 인터벌",
	})
	@IsOptional()
	@IsInt()
	interval?: number;

	@ApiProperty({ example: "2024-10-25 15:06:50", description: "DBMS 시각" })
	@IsOptional()
	//@IsDateString()
	@IsString()
	logtime?: string;
}
