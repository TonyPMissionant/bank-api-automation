import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class TransferClient {

    constructor(private request: APIRequestContext) { }

    async transfer(
        fromAccountId: number,
        toAccountId: number,
        amount: number      
    ) {
        return await this.request.post(
            `${ENV.baseUrl}/transfer`,
            {
                params: {
                    fromAccountId,
                    toAccountId,
                    amount
                },
                headers: {
                    Accept: 'application/json'
                }
            }
        );
    }
}