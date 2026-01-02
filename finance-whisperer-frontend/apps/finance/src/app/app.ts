import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
@Component({
  imports: [RouterModule, MenubarModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'finance';
  navigationItems = [
    { label: 'Home', routerLink: '/' },
    { label: 'Transactions', routerLink: '/transactions' }
  ];
}
