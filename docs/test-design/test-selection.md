# Test Selection

## Purpose

This document records the testing decisions behind the automated API scenarios in this project.

The aim is not to automate every possible scenario. Tests are selected based on risk, business behaviour, and the value of verifying the behaviour automatically.

---

## Test Selection Approach

The general approach is:

**Understand the behaviour → identify risks → define scenarios → select test techniques → automate valuable scenarios**

The automation suite focuses primarily on functional API behaviour, including:

* Successful requests
* Invalid requests
* Authentication behaviour
* Data validation
* State changes
* Relationships between API operations

---

## Testing Techniques

The following ISTQB techniques are applied where they provide useful coverage.

### Equivalence Partitioning

Inputs are grouped into meaningful categories where the system should behave similarly.

Examples:

* Valid credentials
* Invalid credentials
* Valid account IDs
* Invalid account IDs
* Valid transfer amounts
* Invalid transfer amounts

The goal is to test representative values rather than every possible input.

---

### Boundary Value Analysis

Values around meaningful boundaries are considered, particularly where business rules define minimum or maximum values.

For example:

* Minimum permitted transfer amount
* Zero
* Negative amounts
* Maximum permitted amount
* Amount just beyond the permitted limit

---

### Decision Tables

Decision-table thinking is useful where the outcome depends on multiple conditions.

For example, a transfer may depend on:

| Source account | Destination account | Amount  | Expected result   |
| -------------- | ------------------- | ------- | ----------------- |
| Valid          | Valid               | Valid   | Transfer succeeds |
| Valid          | Valid               | Invalid | Transfer rejected |
| Invalid        | Valid               | Valid   | Transfer rejected |
| Valid          | Invalid             | Valid   | Transfer rejected |
| Valid          | Same account        | Valid   | Transfer rejected |

Not every combination necessarily needs automation immediately. The table helps identify meaningful coverage.

---

### State Transition Testing

State changes are particularly important for operations such as transfers.

A transfer can be viewed as:

**Before transfer → Transfer performed → After transfer**

The automated test verifies that the expected state transition occurred.

For the transfer scenario:

* Source balance decreases by the transfer amount.
* Destination balance increases by the transfer amount.

---

### Positive and Negative Testing

Both successful and unsuccessful behaviour should be considered.

**Positive examples:**

* Valid authentication
* Valid account retrieval
* Successful transfer

**Negative examples:**

* Invalid credentials
* Invalid account data
* Invalid transfer parameters
* Requests that should be rejected

---

## Transfer Funds Scenario

### Risk

A successful transfer must correctly move money between the intended accounts.

A response indicating success alone is not sufficient evidence that the financial state changed correctly.

### Selected Test

**Transfer funds between accounts**

The test:

1. Authenticates the customer.
2. Retrieves the customer's accounts.
3. Selects suitable source and destination accounts.
4. Records both balances before the transfer.
5. Transfers a defined amount.
6. Verifies the transfer response.
7. Retrieves both accounts again.
8. Verifies the source balance decreased by the transfer amount.
9. Verifies the destination balance increased by the transfer amount.

### Why This Test Was Selected

The scenario verifies both the API response and the resulting application state.

This provides stronger evidence than checking only for a successful HTTP response or success message.

---

## Risk-Based Thinking

Automation effort should prioritise behaviour where failure would have a meaningful impact.

Higher-risk examples include:

* Authentication
* Account access
* Financial transactions
* Incorrect data updates
* Invalid requests being accepted

The transfer scenario is therefore a higher-value automated test because an incorrect implementation could result in incorrect account balances.

---

## Coverage

Coverage is considered in terms of meaningful behaviour rather than simply the number of automated tests.

The suite should aim to cover:

* Core business journeys
* Important positive paths
* Important negative paths
* Significant boundaries
* State changes
* High-risk failures

Additional scenarios can be added when they provide meaningful coverage rather than simply increasing the test count.

---

## Automation Principle

A test should provide useful information when it fails.

Assertions should therefore verify meaningful outcomes rather than implementation details wherever possible.

For state-changing operations, the preferred pattern is:

**Capture state → perform action → capture state again → verify the expected change**
