import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';

test('Login and get authenticated user', async ({ authClient }) => {

    const loginResponse = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(loginResponse.status()).toBe(200);

    const userResponse = await authClient.getCurrentUser();

    expect(userResponse.status()).toBe(200);

    const userBody = await userResponse.json();

    expect(userBody.username).toBe(validCredentials.username);

});