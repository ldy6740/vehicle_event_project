import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, ValidateNested } from "class-validator";

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

export class ValidationArrayCodeDto {
	@ValidateNested({ each: true })
	@Type(() => CodeDto)
	items: CodeDto[];
}
