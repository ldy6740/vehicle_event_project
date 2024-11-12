import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CodeDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	event: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	step: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	min: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	max: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	opacity: string;
}
