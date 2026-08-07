import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class UserClient {

    constructor(private request: APIRequestContext) {}

    async getUser(id: number) {

        return await this.request.get(
            `${ENV.baseUrl}/users/${id}`
        );

    }

}