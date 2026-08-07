import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class CustomerClient {

    constructor(private request: APIRequestContext) {}

    async getCustomer(id: number) {

        return await this.request.get(
            `${ENV.baseUrl}/customers/${id}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

    }
}