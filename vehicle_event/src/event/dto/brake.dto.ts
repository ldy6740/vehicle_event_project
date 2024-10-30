import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, IsDateString } from "class-validator";

export class BrakeDto {
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
	ontime: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	interval: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	logtime: string;
}
