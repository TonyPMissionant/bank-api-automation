import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';
import { findTransferAccounts } from '../utils/accountSelector';

test('Transfer funds between accounts', async ({
    authClient,
    accountClient,
    transferClient
}) => {

    const loginResponse = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const customerId = loginBody.id;

    const accountsResponse =
        await accountClient.getAccounts(customerId);

    expect(accountsResponse.status()).toBe(200);

    const accounts = await accountsResponse.json();

    const {
        fromAccount,
        toAccount
    } = await findTransferAccounts(
        accountClient,
        accounts
    );

    const amount = 10;

    const sourceBeforeResponse =
        await accountClient.getAccount(fromAccount.id);

    expect(sourceBeforeResponse.status()).toBe(200);

    const sourceBefore = await sourceBeforeResponse.json();

    const destinationBeforeResponse =
        await accountClient.getAccount(toAccount.id);

    expect(destinationBeforeResponse.status()).toBe(200);

    const destinationBefore =
        await destinationBeforeResponse.json();

    const transferResponse = await transferClient.transfer(
        fromAccount.id,
        toAccount.id,
        amount
    );

    console.log(
        'TRANSFER STATUS:',
        transferResponse.status()
    );

    console.log(
        'TRANSFER BODY:',
        await transferResponse.text()
    );

    expect(transferResponse.status()).toBe(200);

    const sourceAfterResponse =
        await accountClient.getAccount(fromAccount.id);

    expect(sourceAfterResponse.status()).toBe(200);

    const sourceAfter = await sourceAfterResponse.json();

    const destinationAfterResponse =
        await accountClient.getAccount(toAccount.id);

    expect(destinationAfterResponse.status()).toBe(200);

    const destinationAfter =
        await destinationAfterResponse.json();

    expect(sourceAfter.balance).toBeCloseTo(
        sourceBefore.balance - amount, 2
    );

    expect(destinationAfter.balance).toBeCloseTo(
        destinationBefore.balance + amount, 2
    );
});