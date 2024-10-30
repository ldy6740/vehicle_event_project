import {
	Controller,
	Post,
	Body,
	UseGuards,
	Get,
	Param,
	Patch,
	Delete,
	Query,
} from "@nestjs/common";
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiSecurity,
} from "@nestjs/swagger";
import { ClientTimezone } from "../common/decorators";
import { ApplicationAuthGuard } from "../auth/guards";
import { AccelerDto } from "./dto/";
import { EventService } from "./event.service";
import { EventParamValidationPipe } from "./pipes";
import { LoggerService } from "../common";

@Controller("event")
export class EventController {
	constructor(
		private readonly eventService: EventService,
		private readonly logger: LoggerService,
	) {}

	@UseGuards(ApplicationAuthGuard)
	@ApiOperation({
		summary: "가속도계 이벤트 정보 조회",
		description: "가속도계 이벤트 정보를 조회합니다",
	})
	@ApiOkResponse({ description: "조회성공", type: AccelerDto })
	@Get("/accelerometer")
	async findAccelerometer(
		@Query("number") number: string,
		@Query("latitude") latitude: string,
		@Query("longitude") longitude: string,
		@Query("ontime") ontime: string,
		@Query("interval") interval: number,
		@Query("logtime") logtime: string,
	) {
		this.logger.log(
			number +
				" / " +
				latitude +
				" / " +
				longitude +
				" / " +
				ontime +
				" / " +
				interval +
				" / " +
				logtime,
		);
		return await this.eventService.findAccelerometer(
			number,
			latitude,
			longitude,
			ontime,
			interval,
			logtime,
		);
	}

	/*
	async findAccelerometer(
		@Body() accelerDto: AccelerDto,
	): Promise<AccelerDto> {
		this.logger.log("EventController");
		return await this.eventService.findAccelerometer(accelerDto);
	}
	*/
}
