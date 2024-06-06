'use strict';

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BelvoController } from './belvo.controller';
import { BelvoService } from './belvo.service';

@Module({
    imports: [HttpModule],
    controllers: [ BelvoController ],
    providers: [ BelvoService ]
})
export class BelvoModule { };