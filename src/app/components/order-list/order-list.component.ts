import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { Customer, Order } from '../..//models';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public orders$: Observable<Order[]>;;
  public displayedColumns = [
    'id',
    'customerId',
    'itemName',
    'quantity',
    'unitPrice',
    'tax',
    'total',
    'createdTimestamp',
    'paymentTimestamp',
    'shippedTimestamp'
  ];
  public customers$: Observable<Customer[]>;
  public selectedCustomer: Customer;
  constructor(private customerService: CustomerService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
    this.orders$ = this.orderService.getOrders();
  }

  refreshList(): void {
    this.orders$ = this.orderService.getOrders();
  }
}
