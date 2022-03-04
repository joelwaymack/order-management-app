import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-editor',
  templateUrl: './order-editor.component.html',
  styleUrls: ['./order-editor.component.scss']
})
export class OrderEditorComponent {
  public orderForm: FormGroup;
  private saving: boolean = false;

  @Input() customer: Customer;
  @Output() closeEditor = new EventEmitter<void>();

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', Validators.required, Validators.min(1)],
      unitPrice: ['', Validators.required, Validators.min(0.01)],
    });
  }

  public submit(): void {
    this.saving = true;
    const order = this.orderForm.value;
    order.customerId = this.customer.id;

    this.orderService.createOrder(order)
      .subscribe(() => {
        this.closeEditor.emit();
        this.saving = false;
      });
  }

  public cancel(): void {
    this.orderForm.reset();
  }

}
