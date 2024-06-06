'use strict';

import { Controller, Get, Param } from '@nestjs/common';
import { BelvoService } from './belvo.service';

@Controller('/api')
export class BelvoController {

    constructor(private readonly belvo: BelvoService) { }

    @Get('/transactions')
    transactions() {
        return this.belvo.transactions();
    }

    @Get('/transactions/:id')
    transaction(@Param('id') id: string) {
        return this.belvo.transaction(id);
    }

}