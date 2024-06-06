'use strict';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	let logger = new Logger('MainService');
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();
	app.setGlobalPrefix('/api');
	await app.listen(process.env.PORT || 3000);
	logger.log(`Main service started on port ${process.env.PORT}`);
}
bootstrap();