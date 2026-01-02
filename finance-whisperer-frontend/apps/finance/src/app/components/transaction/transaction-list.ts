import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction-service';
@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, DatePipe, CurrencyPipe, TableModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit {

  private transactionService = inject(TransactionService);

  public transactions = signal<Transaction[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (response: Transaction[]) => {

        this.transactions.set(response);
      },
      error: (error: any) => {
        console.log('Error fetching transactions:', error);
      }
    });

  }

  addTransaction() {
    const newTransaction: Partial<Transaction> = {
      date: new Date(),
      amount: 100,
      description: 'New Transaction',
      category: 'Miscellaneous',
      type: 'EXPENSE'
    };

    this.transactionService.createTransaction(newTransaction).subscribe({
      next: (response: Transaction) => {
        this.transactions.update(transactions => [...transactions, response]);
      },
      error: (error: any) => {
        console.log('Error adding transaction:', error);
      }
    });

  }
}
