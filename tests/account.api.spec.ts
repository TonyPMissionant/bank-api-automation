import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';

test('Login and get customer accounts', async ({ authClient, accountClient }) => {
    const loginResponse = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const customerId = loginBody.id;

    const response = await accountClient.getAccounts(customerId);

    expect(response.status()).toBe(200);

    const accounts = await response.json();

    expect(accounts.length).toBeGreaterThan(0);

    for (const account of accounts) {

        console.log(
            'ACCOUNT:',
            account.id,
            account.type,
            account.balance
        );

        expect(account.customerId).toBe(customerId);
        expect(account.id).toBeGreaterThan(0);
        expect(['CHECKING', 'SAVINGS', 'LOAN']).toContain(account.type);
        expect(typeof account.balance).toBe('number');
    }
});