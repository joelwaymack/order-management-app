import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models';
import { CustomerService } from 'src/app/services/customer.service';

enum Action {
  Create = 'Create',
  Update = 'Update'
}

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.scss']
})
export class CustomerEditorComponent {
  private _customer: Customer;
  public action: Action = Action.Create;
  public customerForm: FormGroup;
  private saving: boolean = false;

  @Input() set customer(value: Customer) {
    this.customerForm = this.fb.group({
      id: [value.id],
      name: [value.name, Validators.required]
    });
    this._customer = JSON.parse(JSON.stringify(value));
    this.action = value.id ? Action.Update : Action.Create;
  }

  @Output() closeEditor = new EventEmitter<boolean>();

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  public canSubmit(): boolean {
    return this._customer.name !== this.customerForm.value.name && !this.saving;
  }

  public submit(): void {
    this.saving = true;
    const customer = this.customerForm.value;
    let observable: Observable<any>;

    if (this.action === Action.Create) {
      observable = this.customerService.createCustomer(customer);
    } else {
      observable = this.customerService.updateCustomer(customer);
    }

    observable.subscribe(() => {
      this.closeEditor.emit(true);
      this.saving = false;
    });
  }

  public cancel(): void {
    this.closeEditor.emit(false);
  }
}
