import { Route } from '@angular/router';
import { App } from './app';
import { TransactionList } from '../components/transaction/transaction-list';

export const appRoutes: Route[] = [
    { path: 'transactions', component: TransactionList }
];
