import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDateString } from "class-validator";

export class TimerDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	number: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	latitude: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	longitude: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	gpstime: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	logtime: string;
}
