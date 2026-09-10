import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';

test('Login and get a single account', async ({ authClient, accountClient }) => {

    const customer = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );
    const customerId = customer.id;

    const accounts = await accountClient.getAccounts(customerId)

    expect(accounts.length).toBeGreaterThan(0);

    const accountId = accounts[0].id;

    const account = await accountClient.getAccount(accountId);

    expect(account.customerId).toBe(customerId);
});

test('Login and verify account type', async ({ authClient, accountClient}) => {

    const customer = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    const customerId = customer.id;

    const accounts = await accountClient.getAccounts(customerId);

    expect(accounts.length).toBeGreaterThan(0);

    const accountId = accounts[0].id;

    const account = await accountClient.getAccount(accountId);

    expect(['CHECKING', 'SAVINGS', 'LOAN']).toContain(account.type);
});

test('Login and verify account details', async ({ authClient, accountClient}) => {

    const customer = await authClient.login(

        validCredentials.username,
        validCredentials.password
    )

    const customerId = customer.id;

    const accounts = await accountClient.getAccounts(customerId);

    const accountId = accounts[0].id;

    const account = await accountClient.getAccount(accountId);

    expect(account.customerId).toBe(customerId);

    expect(typeof account.balance).toBe('number');
})