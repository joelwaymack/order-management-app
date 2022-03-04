import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../models';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private settingsService: SettingsService, private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.settingsService.orderApiUrl}/api/orders`)
      .pipe(map(orders => {
        return orders.sort((a, b) => a.createdTimestamp > b.createdTimestamp ? -1 : 1);
      }));
  }

  public getOrdersForCustomer(customerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.settingsService.orderApiUrl}/api/customers/${customerId}/orders`)
      .pipe(map(orders => {
        return orders.sort((a, b) => a.createdTimestamp > b.createdTimestamp ? -1 : 1);
      }));;
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.settingsService.orderApiUrl}/api/customers/${order.customerId}/orders`, order);
  }
}
