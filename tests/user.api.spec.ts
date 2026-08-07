import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';
import { userTestData } from '../data/userData';

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

test('Get user by ID', async ({ userClient }) => {

    const response = await userClient.getUser(
        userTestData.validUserId
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(userTestData.expectedUserData.id);
    expect(responseBody.firstName).toBe(userTestData.expectedUserData.firstName);
    expect(responseBody.lastName).toBe(userTestData.expectedUserData.lastName);
    expect(responseBody.email).toBe(userTestData.expectedUserData.email);
});

test('Get non-existent user', async ({ userClient }) => {

    const response = await userClient.getUser(
        userTestData.invalidUserId
    );

    expect(response.status()).toBe(404);

    const responseBody = await response.json();

    expect(responseBody.message).toContain(
        userTestData.invalidUserId.toString()
    );
    expect(responseBody.message).toContain('not found');
});