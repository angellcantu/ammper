'use strict';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';

@Injectable()
export class BelvoService {

    constructor(
        private readonly http: HttpService,
        private readonly config: ConfigService
    ) { }

    private credentials(): string {
        return Buffer.from(`${this.config.get<string>('BELVO_SECRET_ID')}:${this.config.get<string>('BELVO_SECRET_PASSWORD')}`).toString('base64');
    }

    async transactions() {
        let credentials: string = this.credentials();
        let body = {
            link: '2822f341-61fd-458f-a487-10417230f6c2',
            date_from: '2024-05-01',
            date_to: '2024-06-07',
            save_data: true
        };
        let { data }: AxiosResponse = await firstValueFrom(
            this.http.post(`${this.config.get<string>('BELVO_BASE_URL')}/api/transactions/`, { ...body }, {
                headers: {
                    Authorization: `Basic ${credentials}`
                }
            })
            .pipe(catchError((error: AxiosError) => {
                throw new HttpException(error.response.data, HttpStatus.CONFLICT);
            }))
        );
        return data;
    }

    async transaction(id: string) {
        let credentials: string = this.credentials();
        let { data }: AxiosResponse = await firstValueFrom(
            this.http.get(`${this.config.get<string>('BELVO_BASE_URL')}/api/transactions/${id}/`, {
                headers: {
                    Authorization: `Basic ${credentials}`
                }
            })
            .pipe(catchError((error: AxiosError) => {
                throw new HttpException(error.response.data, HttpStatus.CONFLICT);
            }))
        );
        return data;
    }

}