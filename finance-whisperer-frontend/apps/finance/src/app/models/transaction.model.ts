export interface Transaction {
    id: number;
    date: Date;
    amount: number;
    description: string;
    category: string;
    type: 'INCOME' | 'EXPENSE';
}