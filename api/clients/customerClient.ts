import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../../config/env';
import { Customer } from '../../types/customer';

export class CustomerClient {

    constructor(private request: APIRequestContext) { }

// customer's data

    async getCustomer(id: number): Promise<Customer> {

        const response = await this.requestCustomer(id);

        return response.json();
    }

    // raw HTTP response

    async getCustomerResponse(id: number): Promise<APIResponse> {

        return this.requestCustomer(id);
    }

    // one place responsible for making the request
    
    private async requestCustomer(id: number): Promise<APIResponse>  {
        const response = await this.request.get(
            `${ENV.baseUrl}/customers/${id}`,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );
        return response;
    }
}
