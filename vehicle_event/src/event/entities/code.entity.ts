import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "value_code" }) // 데이터베이스 테이블의 이름
export class CodeEntitiy {
	@PrimaryColumn({
		name: "Event",
		type: "varchar",
		length: 50,
	})
	Event: string;

	@PrimaryColumn({
		name: "Step",
		type: "varchar",
		length: 50,
	})
	Step: string;

	@Column({
		name: "Min_Value",
		type: "float",
		nullable: true,
	})
	Min_Value: number;

	@Column({
		name: "Max_Value",
		type: "float",
		nullable: true,
	})
	Max_Value: number;

	@Column({
		name: "opacity",
		type: "float",
		nullable: true,
	})
	opacity: number;
}
