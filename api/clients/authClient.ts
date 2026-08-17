import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';
import { Customer } from '../../types/customer';

export class AuthClient {

    constructor(private request: APIRequestContext) {}

    async login(
        username: string,
        password: string
    ): Promise<Customer> {

        const response = await this.request.get(
            `${ENV.baseUrl}/login/${username}/${password}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

        return await response.json();
    }
}
