import { test, expect } from '@playwright/test';
import { ENV } from '../config/env';
import { PostClient } from '../api/clients/postClient';

test('API health check', async ({ request }) => {

    const postClient = new PostClient(request);

    const response = await postClient.getPost(1);

    expect(response.status()).toBe(200);

});