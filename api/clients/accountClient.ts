import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';
import { Account } from '../../types/account';

export class AccountClient {

    constructor(private request: APIRequestContext) { }

    async getAccounts(customerId: number): Promise<Account[]> {

        const response = await this.request.get(
            `${ENV.baseUrl}/customers/${customerId}/accounts`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

        return await response.json();
    }

    async getAccount(accountId: number): Promise<Account> {

        const response = await this.request.get(
            `${ENV.baseUrl}/accounts/${accountId}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

        return await response.json();
    }
}