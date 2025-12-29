import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, DatePipe, CurrencyPipe, TableModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList {

  public transactions = signal<Transaction[]>([
    { id: 1, date: new Date(), description: 'Gehalt', amount: 3500, category: 'Einkommen', type: 'INCOME' },
    { id: 2, date: new Date(), description: 'Miete', amount: -1200, category: 'Wohnen', type: 'EXPENSE' },
    { id: 3, date: new Date(), description: 'Netflix', amount: -12.99, category: 'Unterhaltung', type: 'EXPENSE' }
  ]);

  addTransaction() {
    this.transactions.update(transactions => [
      ...transactions,
      { id: transactions.length + 1, date: new Date(), description: 'Neue Transaktion', amount: 0, category: 'Unbekannt', type: 'INCOME' }
    ]);
  }
}
