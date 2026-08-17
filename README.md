# Bank API Automation

## Overview

API automation framework built using Playwright and TypeScript for testing the ParaBank banking API.

The framework demonstrates API test automation using reusable API clients, Playwright fixtures, test data, utility functions and business-level assertions.

The project is designed as a maintainable API automation framework rather than simply a collection of individual endpoint tests.

---

## Tech Stack

- TypeScript
- Playwright
- Node.js
- ParaBank API

---

## Project Structure

```text
bank-api-automation/
├── api/
│   └── clients/
├── config/
├── data/
├── fixtures/
├── tests/
├── utils/
├── playwright.config.ts
├── package.json
└── README.md
```

### `api/clients`

Contains reusable API client classes responsible for communicating with individual API endpoints.

Current clients include:

- `authClient.ts` - authentication and login requests
- `customerClient.ts` - customer-related requests
- `accountClient.ts` - account-related requests
- `transferClient.ts` - fund transfer requests

Keeping HTTP communication inside dedicated client classes separates API implementation details from test logic.

### `config`

Contains configuration used by the test framework.

The API base URL is managed through environment variables rather than being repeated throughout the test suite.

### `data`

Contains reusable test data.

For example:

- authentication credentials
- other test-specific data

Sensitive credentials or environment-specific values should not be committed to source control.

### `fixtures`

Contains custom Playwright fixtures.

The API clients are created as fixtures so tests can request the client they need directly.

For example:

```typescript
test('example', async ({ accountClient }) => {
    // accountClient is provided by the Playwright fixture
});
```

This avoids repeatedly creating API client instances inside individual tests.

### `tests`

Contains the API test specifications.

Current coverage includes:

- authentication
- customer details
- customer accounts
- account details
- account validation
- fund transfers
- balance validation before and after transfers

### `utils`

Contains reusable test-support functions.

For example:

`accountSelector.ts`

This utility dynamically identifies suitable accounts for transfer testing.

Instead of relying on specific hard-coded account IDs, the utility:

1. Examines the customer's available accounts.
2. Retrieves the account details.
3. Checks that the account exists successfully.
4. Checks that the balance is greater than zero.
5. Excludes loan accounts.
6. Selects two suitable accounts.
7. Stops searching once two valid accounts have been found.

This makes the transfer test more resilient to changes in the customer's account data.

---

## Test Design Approach

The framework follows a separation-of-concerns approach.

### Tests

Tests describe the behaviour being validated.

They should contain the scenario and the assertions rather than the low-level HTTP implementation.

### API Clients

API clients are responsible for communicating with the API.

For example, the `TransferClient` knows how to construct and send the transfer request, while the test simply calls the client method.

### Fixtures

Fixtures provide reusable API clients to the tests.

This keeps test setup consistent and reduces duplication.

### Utilities

Utilities contain reusable pieces of test logic.

For example, `accountSelector.ts` contains the logic for finding suitable accounts for a transfer.

### Test Data

Test data is kept separate from the test implementation.

This makes it easier to change credentials or other values without modifying the test logic.

---

## Current Test Coverage

### Authentication

Tests the ParaBank login endpoint and verifies that authentication succeeds.

The customer ID is obtained dynamically from the login response rather than being required as a hard-coded value in the test.

### Customer Details

Validates that customer information can be retrieved after authentication.

### Customer Accounts

Retrieves the customer's accounts and validates important account properties such as:

- account ID
- customer ID
- account type
- balance

The current test data includes account types such as:

- `CHECKING`
- `SAVINGS`
- `LOAN`

### Account Details

Retrieves individual account details and validates the returned account information.

### Fund Transfer

The transfer test validates the complete transfer workflow.

The test:

1. Authenticates the customer.
2. Obtains the customer ID from the login response.
3. Retrieves the customer's accounts.
4. Dynamically identifies two suitable accounts.
5. Records the source account balance.
6. Records the destination account balance.
7. Transfers funds.
8. Verifies the transfer succeeds.
9. Retrieves both accounts again.
10. Verifies the source balance decreased correctly.
11. Verifies the destination balance increased correctly.

The transfer test therefore validates both the API response and the resulting business behaviour.

---

## Dynamic Account Selection

The transfer test does not rely on permanently hard-coded account IDs.

The `findTransferAccounts()` utility searches the customer's available accounts and selects accounts that meet the requirements for a transfer test.

An account is considered suitable when:

- the account request succeeds
- the balance is greater than zero
- the account is not a loan account

The search stops once two valid accounts have been found.

This approach is more maintainable than assuming that specific account IDs will always exist.

---

## Assertions

The framework currently performs several levels of validation.

### HTTP Status Validation

Tests verify that API requests return the expected HTTP status.

For example:

```typescript
expect(response.status()).toBe(200);
```

### Response Data Validation

Returned response data is checked for expected values and types.

For example:

```typescript
expect(account.id).toBeGreaterThan(0);
expect(typeof account.balance).toBe('number');
```

### Business Validation

The tests also validate business behaviour rather than only checking that an endpoint responds successfully.

For example, after a successful transfer the source balance should decrease and the destination balance should increase.

Because JavaScript uses floating-point numbers, currency assertions use a suitable precision rather than requiring exact binary floating-point equality.

For example:

```typescript
expect(sourceAfter.balance).toBeCloseTo(
    sourceBefore.balance - amount,
    2
);

expect(destinationAfter.balance).toBeCloseTo(
    destinationBefore.balance + amount,
    2
);
```

This verifies the balance to two decimal places.

---

## API Client Pattern

The framework uses dedicated API client classes.

For example, the transfer client contains the API request implementation:

```typescript
async transfer(
    fromAccountId: number,
    toAccountId: number,
    amount: number
) {
    return await this.request.post(
        `${ENV.baseUrl}/transfer`,
        {
            params: {
                fromAccountId,
                toAccountId,
                amount
            },
            headers: {
                Accept: 'application/json'
            }
        }
    );
}
```

The test does not need to know how the HTTP request is constructed.

Instead, it can call:

```typescript
const transferResponse = await transferClient.transfer(
    fromAccount.id,
    toAccount.id,
    amount
);
```

This keeps HTTP implementation details inside the API client.

---

## Environment Configuration

The framework uses environment variables for configuration.

Create a `.env` file in the project root containing:

```text
BASE_URL=https://parabank.parasoft.com/parabank/services/bank
```

Environment files containing credentials or other secrets should not be committed to source control.

The framework reads the configured base URL and uses it throughout the API clients.

---

## Running the Tests

### Install Dependencies

After cloning the repository:

```bash
npm install
```

### Run the Complete Test Suite

```bash
npx playwright test
```

### Run a Specific Test

For example:

```bash
npx playwright test transfer.api.spec.ts
```

### Run Multiple Tests

```bash
npx playwright test auth.api.spec.ts account.api.spec.ts accountDetails.api.spec.ts
```

### View the Playwright HTML Report

```bash
npx playwright show-report
```

---

## Test Reporting

Playwright provides HTML test reporting for the framework.

After running the tests, the report can be opened using:

```bash
npx playwright show-report
```

The report provides information about:

- passed tests
- failed tests
- test duration
- error details
- test execution steps
- screenshots and other Playwright artefacts where configured

---

## Current Framework Principles

The project currently demonstrates:

- reusable API clients
- Playwright fixtures
- TypeScript
- reusable test data
- environment-based configuration
- utility functions
- dynamic test data selection
- layered assertions
- business-level validation
- separation of concerns
- reusable test components

The goal is to keep the framework clean and maintainable as additional API coverage is introduced.

---

## Future Improvements

The framework will continue to evolve.

Planned improvements include:

- API response schema validation
- Strong TypeScript API models and interfaces
- Additional negative API scenarios
- Expanded account operation coverage
- Additional transfer validation
- CI/CD integration
- Improved reporting
- Performance testing integration
- Additional reusable utilities

### API Schema Validation

Schema validation is planned as an additional layer of API contract validation.

The purpose will be to verify not only that an endpoint returns HTTP 200, but also that the response conforms to the expected structure.

For example, an account response should contain fields such as:

```text
Account
├── id          → number
├── customerId  → number
├── type        → CHECKING | SAVINGS | LOAN
└── balance     → number
```

This will help detect unexpected API contract changes even when the endpoint continues to return a successful HTTP status.

A schema validation library such as AJV may be considered as part of this improvement.

### Strong TypeScript Models

Some current API response handling is intentionally lightweight.

For example, the account selector currently accepts API response data without a dedicated TypeScript model.

A future improvement will be to introduce interfaces or types such as an `Account` model.

This will reduce the use of loosely typed values such as `any` and allow TypeScript to provide stronger compile-time checks.

### Negative API Testing

Additional negative scenarios will be introduced to verify behaviour for situations such as:

- invalid credentials
- invalid customer IDs
- invalid account IDs
- insufficient funds
- invalid transfer amounts
- invalid account combinations
- malformed requests

### CI/CD

The framework can be integrated with a CI/CD pipeline so that API tests execute automatically when changes are pushed to the repository.

GitHub Actions is a potential implementation.

### Performance Testing

Performance testing is being explored separately using K6.

The longer-term goal is to keep functional API automation and performance testing as complementary parts of the overall API testing approach.

---

## Project Goals

The purpose of this project is to demonstrate how a maintainable API automation framework can be structured using modern testing practices.

The framework aims to demonstrate:

- API automation
- reusable architecture
- TypeScript development
- Playwright API testing
- test isolation
- fixture-based dependency management
- dynamic test data
- business-level assertions
- API contract validation
- maintainable test design

The framework will continue to evolve as additional API testing techniques are introduced.
