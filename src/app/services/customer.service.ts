import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private settingsService: SettingsService, private http: HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.settingsService.customerApiUrl}/customers`);
  }

  public getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.settingsService.customerApiUrl}/customers/${id}`);
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.settingsService.customerApiUrl}/customers`, customer);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.settingsService.customerApiUrl}/customers/${customer.id}`, customer);
  }

  public deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${this.settingsService.customerApiUrl}/customers/${id}`);
  }
}
