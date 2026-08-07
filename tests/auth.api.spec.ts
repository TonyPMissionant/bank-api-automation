import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';
import { expectedCustomer } from '../data/customerData';

test('Login and get customer details', async ({ authClient, customerClient }) => {

    const loginResponse = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const customerId = loginBody.id;

    console.log('Customer ID:', customerId);

    expect(customerId).toBeGreaterThan(0);

    const customerResponse = await customerClient.getCustomer(
        customerId
    );

    expect(customerResponse.status()).toBe(200);

    const customerBody = await customerResponse.json();

    expect(customerBody.firstName).toBe(expectedCustomer.firstName);
    expect(customerBody.lastName).toBe(expectedCustomer.lastName);
    expect(customerBody.address.city).toBe(expectedCustomer.city);

});