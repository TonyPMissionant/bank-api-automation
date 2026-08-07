import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';

test('Login and get account details', async ({ authClient, accountClient }) => {

    const loginResponse = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const customerId = loginBody.id;

    const accountsResponse = await accountClient.getAccounts(customerId);

    expect(accountsResponse.status()).toBe(200);

    const accounts = await accountsResponse.json();

    expect(accounts.length).toBeGreaterThan(0);

    const accountId = accounts[0].id;

    const accountResponse = await accountClient.getAccount(accountId);

    expect(accountResponse.status()).toBe(200);

    const account = await accountResponse.json();

    expect(account.id).toBe(accountId);
    expect(account.customerId).toBe(customerId);
    expect(account.type).toMatch(/CHECKING|SAVINGS/);
    expect(typeof account.balance).toBe('number');

});