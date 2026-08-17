import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class AuthClient {

    private accessToken: string | undefined;

    constructor(private request: APIRequestContext) { }

    async login(username: string, password: string) {

        console.log(
            'AUTH URL:',
            `${ENV.baseUrl}/login/${username}/${password}`
        );
        
        return await this.request.get(
            `${ENV.baseUrl}/login/${username}/${password}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

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