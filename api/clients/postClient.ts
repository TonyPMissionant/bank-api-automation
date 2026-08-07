import { APIRequestContext } from '@playwright/test';
import { ENV } from '../../config/env';

export class PostClient {

    constructor(private request: APIRequestContext) { }

    async getPost(id: number) {
        
        return await this.request.get(
            `${ENV.baseUrl}/posts/${id}`
        );
    }

    async createPost(postData: object) {
        
        return await this.request.post(
            `${ENV.baseUrl}/posts`,
            {
                data: postData
            }
        );
    }
}