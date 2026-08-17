export interface Account {
    id: number;
    customerId: number;
    type: 'CHECKING' | 'SAVINGS' | 'LOAN';
    balance: number;
}