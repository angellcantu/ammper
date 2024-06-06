'use strict';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppNewModule } from './app/';
import { BelvoModule } from './belvo';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AppNewModule,
        BelvoModule
    ]
})
export class AppModule { };