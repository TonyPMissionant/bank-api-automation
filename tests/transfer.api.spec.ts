import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';
import { findTransferAccounts } from '../utils/accountSelector';

test('Transfer funds between accounts', async ({
    authClient,
    accountClient,
    transferClient
}) => {

    const customer = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(customer.id).toBeGreaterThan(0);

    const accounts =
        await accountClient.getAccounts(customer.id);

    expect(accounts.length).toBeGreaterThan(0);

    const {
        fromAccount,
        toAccount
    } = await findTransferAccounts(
        accountClient,
        accounts
    );

    const amount = 10;

    const sourceBefore =
        await accountClient.getAccount(fromAccount.id);

    const destinationBefore =
        await accountClient.getAccount(toAccount.id);

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

    const sourceAfter =
        await accountClient.getAccount(fromAccount.id);

    const destinationAfter =
        await accountClient.getAccount(toAccount.id);

    expect(sourceAfter.balance).toBeCloseTo(
        sourceBefore.balance - amount,
        2
    );

    expect(destinationAfter.balance).toBeCloseTo(
        destinationBefore.balance + amount,
        2
    );

});