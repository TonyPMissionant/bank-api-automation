import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class AccountClient {

    constructor(private request: APIRequestContext) { }

    async getAccounts(customerId: number) {

        return await this.request.get(
            `${ENV.baseUrl}/customers/${customerId}/accounts`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

    }
    async getAccount(accountId: number) {

        return await this.request.get(
            `${ENV.baseUrl}/accounts/${accountId}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

    }
}