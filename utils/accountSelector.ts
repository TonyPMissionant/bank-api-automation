import { Account } from '../types/account';

export async function findTransferAccounts(
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