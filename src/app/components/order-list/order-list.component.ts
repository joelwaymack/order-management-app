import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../..//models';

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

  private refreshSubscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.refreshList();

    this.refreshSubscription = interval(1000)
      .subscribe(() => this.refreshList());
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  public refreshList(): void {
    this.orders$ = this.orderService.getOrders();
  }
}
