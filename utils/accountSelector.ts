import { AccountClient } from '../api/clients/accountClient';
import { Account } from '../data/accountData';

export async function findTransferAccounts(
    accountClient: AccountClient,
    accounts: Account[],
) {
    const validAccounts: Account[] = [];

    for (const account of accounts) {
        const response = await accountClient.getAccount(account.id);

        if (response.status() === 200) {
            const accountBody = await response.json();

            if (
                accountBody.balance > 0 &&
                accountBody.type !== 'LOAN'
            ) {
                validAccounts.push(accountBody);
            }
        }
        if (validAccounts.length >= 2) {
            break;
        }
    }
    if (validAccounts.length < 2) {
        throw new Error(
            'Could not find two valid accounts for transfer testing.'
        );
    }
    return {
        fromAccount: validAccounts[0],
        toAccount: validAccounts[1],
    };
}