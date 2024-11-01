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

	@ApiProperty({
		example: "2024-10-25 12:06:06",
		description: "조회 시작 시간",
	})
	@IsOptional()
	//@IsDateString()
	@IsString()
	starttime: string;

	@ApiProperty({
		example: "2024-10-25 15:06:06",
		description: "조회 종료 시간",
	})
	@IsOptional()
	//@IsDateString()
	@IsString()
	endtime: string;
}
