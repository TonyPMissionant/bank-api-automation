import { test, expect } from '@playwright/test';
import { PostClient } from '../api/clients/postClient';
import { newPost } from '../data/postData';

test('Create a new post', async ({ request }) => {

    const postClient = new PostClient(request);

    const response = await postClient.createPost(newPost);

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.body).toBe(newPost.body);
    expect(responseBody.userId).toBe(newPost.userId);

});