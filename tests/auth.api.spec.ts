import { test, expect } from '../fixtures/api.fixture';
import { validCredentials } from '../data/authData';
import { expectedCustomer } from '../data/customerData';

test('Login and get customer details', async ({ authClient, customerClient }) => {

    const customer = await authClient.login(
        validCredentials.username,
        validCredentials.password
    );

    expect(customer.id).toBeGreaterThan(0);

    const customerDetails = await customerClient.getCustomer(
        customer.id
    );

    expect(customerDetails.firstName).toBe(expectedCustomer.firstName);
    expect(customerDetails.lastName).toBe(expectedCustomer.lastName);
    expect(customerDetails.address.city).toBe(expectedCustomer.city);

});