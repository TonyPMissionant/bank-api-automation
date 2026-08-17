import { test as base, expect } from '@playwright/test';
import { AuthClient } from '../api/clients/authClient';
import { CustomerClient } from '../api/clients/customerClient';
import { AccountClient } from '../api/clients/accountClient';
import { TransferClient } from '../api/clients/transferClient';

type ApiFixtures = {
    authClient: AuthClient;
    customerClient: CustomerClient;
    accountClient: AccountClient;
    transferClient: TransferClient;
};

export const test = base.extend<ApiFixtures>({

    authClient: async ({ request }, use) => {

        const authClient = new AuthClient(request);

        await use(authClient);

    },
    customerClient: async ({ request }, use) => {

        const customerClient = new CustomerClient(request);

        await use(customerClient);
    },

    accountClient: async ({ request }, use) => {

        const accountClient = new AccountClient(request);

        await use(accountClient);
    },

    transferClient: async ({ request }, use) => {

        const transferClient = new TransferClient(request);

        await use(transferClient);
    },
});
export { expect };