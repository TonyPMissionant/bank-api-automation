import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';

test('Login with valid credentials', async ({ authClient }) => {

    const response = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.username).toBe('emilys');
    expect(responseBody.accessToken).toBeTruthy();

});