import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class TransferClient {

    constructor(private request: APIRequestContext) { }

    async transfer(
        fromAccountId: number,
        toAccountId: number,
        amount: number
    ): Promise<string> {

        const response = await this.request.post(
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

        return await response.text();
    }
}