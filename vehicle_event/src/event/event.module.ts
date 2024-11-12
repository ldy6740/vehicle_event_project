import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { AccelerometerEntitiy } from "./entities/";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([AccelerometerEntitiy])],
	controllers: [EventController],
	providers: [EventService],
	//exports: [TypeOrmModule, EventService],
})
export class EventModule {}
