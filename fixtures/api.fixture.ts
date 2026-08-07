import { test as base, expect } from '@playwright/test';
import { PostClient } from '../api/clients/postClient';
import { UserClient } from '../api/clients/userClient';
import { AuthClient } from '../api/clients/authClient';
import { CustomerClient } from '../api/clients/customerClient';
import { AccountClient } from '../api/clients/accountClient';

type ApiFixtures = {
    postClient: PostClient;
    userClient: UserClient;
    authClient: AuthClient;
    customerClient: CustomerClient;
    accountClient: AccountClient;
};

export const test = base.extend<ApiFixtures>({
    postClient: async ({ request }, use) => {
        const postClient = new PostClient(request);

        await use(postClient);
    },
    userClient: async ({ request }, use) => {
        const userClient = new UserClient(request);

        await use(userClient);
    },
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
    }
});
export { expect };