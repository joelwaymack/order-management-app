import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public customers$: Observable<Customer[]>;;
  public displayedColumns = ['id', 'name'];
  public selectedCustomer: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
  }

  public closeEditor(refreshList: Boolean): void {
    this.selectedCustomer = null;
    if (refreshList) {
      this.customers$ = this.customerService.getCustomers();
    }
  }
}
