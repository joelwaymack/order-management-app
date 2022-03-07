import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, interval } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { Customer, Order } from '../..//models';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public orders$: Observable<Order[]>;
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
  public selectedCustomer: Customer = { id: '0', name: 'All' };

  private refreshSubscription: Subscription;

  constructor(private customerService: CustomerService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers()
      .pipe(map(customers => [this.selectedCustomer, ...customers]));

    this.refreshList();

    this.refreshSubscription = interval(1000)
      .subscribe(() => this.refreshList());
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  public refreshList(): void {
    if (this.selectedCustomer && this.selectedCustomer.id !== '0') {
      this.orders$ = this.orderService.getOrdersForCustomer(this.selectedCustomer.id);
    } else {
      this.orders$ = this.orderService.getOrders();
    }
  }
}
