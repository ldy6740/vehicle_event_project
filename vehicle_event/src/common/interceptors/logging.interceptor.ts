import { LoggerService } from "../logger/logger.service";
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	constructor(private readonly logger: LoggerService) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest<Request>();
		const { method, url } = request;
		const ctx = `${context.getClass().name} ➜ ${context.getHandler().name}()`;
		const now = Date.now();

		return next.handle().pipe(
			tap((response) => {
				const ms = `+${Date.now() - now}ms`;
				this.logger.info(`${method} ${url} ${ms}`, ctx);
				this.logger.debug(response, ctx);

				return response;
			}),
		);
	}
}
