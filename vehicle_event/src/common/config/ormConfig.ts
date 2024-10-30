import { ConfigService } from "nestjs-config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export function TypeormConfig(configService: ConfigService) {
	//const env = configService.get("NODE_ENV");
	const env = process.env.NODE_ENV;
	if (!["dev", "prod"].includes(env)) {
		throw Error("반드시 dev, prod 중 하나의 환경에 속해야 합니다.");
	}

	const synchronize = process.env.SYNCHRONIZE === "true" ? true : false;
	const logging = process.env.DB_LOGGING === "true" ? true : false;

	const option: TypeOrmModuleOptions = {
		type: "mysql", // DB 종류
		host: process.env.DB_HOST, // HOST 정보
		port: +process.env.DB_PORT, // PORT 정보
		username: process.env.DB_USERNAME, // DB 아이디
		password: process.env.DB_PASSWORD, // DB 비밀번호
		database: process.env.DB_DATABASE, // 데이터베이스명
		charset: process.env.DB_CHARSET, // 데이터베이스 charset
		entities: [path.join(__dirname, "src/*.*/entities/")], // 소스 코드 내에서 TypeORM이 구동될 때 인식하도록 할 엔티티 클래스 경로
		autoLoadEntities: true, // 프로젝트 내에 있는 entity를 자동으로 스캔해서 사용할지 설정
		//synchronize: env === "production" ? false : synchronize, // DB 동기화 설정
		synchronize: synchronize, // DB 동기화 설정
		logging: logging, // 로그 정보를 출력할지 설정
		retryAttempts: env === "production" ? 10 : 1, // DB 연결 시도 횟수
	};

	return option;
}
