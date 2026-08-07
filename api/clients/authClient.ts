import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class AuthClient {

    private accessToken: string | undefined;

    constructor(private request: APIRequestContext) { }

    async login(username: string, password: string) {

        const response = await this.request.post(
            `${ENV.baseUrl}/auth/login`,
            {
                data: {
                    username,
                    password
                }
            }

        );
        const responseBody = await response.json();

        this.accessToken = responseBody.accessToken;

        return response;
    }

    async getCurrentUser() {

        return await this.request.get(
            `${ENV.baseUrl}/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            }
        );
    }
} 