import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';

test('Login and get account details', async ({ authClient, accountClient }) => {

    const customer = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(customer.id).toBeGreaterThan(0);

    const accounts = await accountClient.getAccounts(customer.id);

    expect(accounts.length).toBeGreaterThan(0);

    const accountId = accounts[0].id;

    const account = await accountClient.getAccount(accountId);

    expect(account.id).toBe(accountId);
    expect(account.customerId).toBe(customer.id);
    expect(['CHECKING', 'SAVINGS', 'LOAN']).toContain(account.type);
    expect(typeof account.balance).toBe('number');

});