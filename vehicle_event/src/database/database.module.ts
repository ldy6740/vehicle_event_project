import { TypeormConfig } from "../common/config";
// import { ConfigModule } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "nestjs-config";

import { LoggerModule, TypeOrmExceptionFilter } from "../common";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: TypeormConfig,
			inject: [ConfigService],
		}),
		LoggerModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: TypeOrmExceptionFilter,
		},
	],
})
export class DatabaseModule {}
