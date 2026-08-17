import { Account } from '../types/account';
import { AccountClient } from '../api/clients/accountClient';

export async function findTransferAccounts(
    accountClient: AccountClient,
    accounts: Account[]
) {

    for (const account of accounts) {

        if (account.type !== 'CHECKING') {
            continue;
        }

        if (account.balance <= 0) {
            continue;
        }

        for (const destination of accounts) {

            if (destination.id === account.id) {
                continue;
            }

            if (destination.type !== 'CHECKING') {
                continue;
            }

            return {
                fromAccount: account,
                toAccount: destination
            };
        }
    }

    throw new Error('Could not find suitable transfer accounts');
}