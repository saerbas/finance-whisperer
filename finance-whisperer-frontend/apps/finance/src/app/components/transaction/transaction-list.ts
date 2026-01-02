import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-transaction-list',
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    TableModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    SelectModule
  ],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit {

  private transactionService = inject(TransactionService);
  private formBuilder = inject(FormBuilder);

  public transactions = signal<Transaction[]>([]);

  // controll dialog visibility
  public isDialogVisible = false;

  transactionForm = this.formBuilder.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: ['Allgemein', Validators.required],
    type: ['EXPENSE', Validators.required],
  });

  // dropdown options for transaction type
  transactionTypes = [
    { label: 'Einnahmen', value: 'INCOME' },
    { label: 'Ausgaben', value: 'EXPENSE' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadData();

  }
  loadData() {
    this.transactionService.getTransactions().subscribe({
      next: (response: Transaction[]) => {

        this.transactions.set(response);
      },
      error: (error: any) => {
        console.log('Error fetching transactions:', error);
      }
    });
  }

  openNewTransactionDialog() {
    this.transactionForm.reset({
      description: '',
      amount: 0,
      category: 'Allgemein',
      type: 'EXPENSE'
    });
    this.isDialogVisible = true;
  }

  addTransaction() {
    if (this.transactionForm.invalid) return;

    const formValues = this.transactionForm.value;
    const newTransaction: Partial<Transaction> = {
      description: formValues.description as string,
      amount: formValues.amount as number,
      category: formValues.category as string,
      type: formValues.type as string as 'INCOME' | 'EXPENSE',
      date: new Date(),
      id: 0 // Placeholder, actual ID should be set by the backend
    };


    this.transactionService.createTransaction(newTransaction).subscribe({
      next: (response: Transaction) => {
        this.transactions.update(transactions => [...transactions, response]);
        this.isDialogVisible = false;
        this.transactionForm.reset();
      },
      error: (error: any) => {
        console.log('Error adding transaction:', error);
      }
    });

  }
}
