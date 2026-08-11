import { test, expect } from '../fixtures/api.fixture';

test('API smoke check', async ({ customerClient }) => {

    const response = await customerClient.getCustomer(12212);

    expect(response.status()).toBe(200);
});