import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';

test('Login and get account details', async ({ authClient, accountClient }) => {

    const customer = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(customer.id).toBeGreaterThan(0);

    const accountsResponse = await accountClient.getAccounts(
        customer.id
    );

    expect(accountsResponse.status()).toBe(200);

    const accounts = await accountsResponse.json();

    expect(accounts.length).toBeGreaterThan(0);

    const accountId = accounts[0].id;

    const accountResponse = await accountClient.getAccount(accountId);

    expect(accountResponse.status()).toBe(200);

    const account = await accountResponse.json();

    expect(account.id).toBe(accountId);
    expect(account.customerId).toBe(customer.id);
    expect(['CHECKING', 'SAVINGS', 'LOAN']).toContain(account.type);
    expect(typeof account.balance).toBe('number');

});