import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent implements OnInit {
  public orderForm: FormGroup;
  public customers$: Observable<Customer[]>;
  public saving: boolean = false;

  @Output() closeEditor = new EventEmitter<void>();

  constructor(private orderService: OrderService, private fb: FormBuilder, private customerService: CustomerService) {
    this.orderForm = this.fb.group({
      customerId: ['', Validators.required],
      itemName: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers();
  }

  public submit(formDirective: FormGroupDirective): void {
    this.saving = true;

    this.orderService.createOrder(this.orderForm.value)
      .subscribe(() => {
        this.orderForm.reset();
        formDirective.resetForm();
        this.closeEditor.emit();
        this.saving = false;
      });
  }

  public cancel(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.orderForm.reset();
  }

}
