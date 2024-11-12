import {
	Controller,
	Post,
	UseGuards,
	Get,
	Query,
	Body,
	Param,
	Request,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ApplicationAuthGuard } from "../auth/guards";
import { AccelerDto } from "./dto/";
import { CodeDto } from "./dto/";
import { EventService } from "./event.service";
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
		description: "가속도, 브레이크 이벤트 정보를 조회",
	})
	@ApiOkResponse({ description: "조회성공", type: AccelerDto })
	@Get("/accelerometer")
	async findAccelerometer(
		@Query("number") number: string,
		@Query("firststarttime") firststarttime: string,
		@Query("starttime") starttime: string,
		@Query("endtime") endtime: string,
	) {
		this.logger.log(
			number +
				" / " +
				firststarttime +
				" / " +
				starttime +
				" / " +
				endtime,
		);
		return await this.eventService.findAccelerometer(
			number,
			firststarttime,
			starttime,
			endtime,
		);
	}

	@UseGuards(ApplicationAuthGuard)
	@ApiOperation({
		summary: "강중약에 대한 정보 저장",
		description: "강중약에 대한 정보 저장",
	})
	@ApiOkResponse({ description: "저장성공", type: CodeDto })
	@Post("/code")
	async saveCodeValue(@Body() codeDto: CodeDto) {
		this.logger.log(codeDto);
		const result = await this.eventService.saveCodeValue(codeDto);
		if (result) {
			return "{'resultCode':'200'}";
		} else {
			return "{'resultCode':'100'}";
		}
	}
}
