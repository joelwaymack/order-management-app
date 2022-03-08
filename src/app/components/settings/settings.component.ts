import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private initialValue: {
    customerApiUrl: '',
    orderApiUrl: '',
    appInsightsConnectionString: ''
  }

  settingsForm = this.fb.group({
    customerApiUrl: [''],
    orderApiUrl: [''],
    appInsightsConnectionString: ['']
  });

  constructor(private settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.settingsForm.controls['customerApiUrl'].setValue(this.settingsService.customerApiUrl);
    this.settingsForm.controls['orderApiUrl'].setValue(this.settingsService.orderApiUrl);
    this.settingsForm.controls['appInsightsConnectionString'].setValue(this.settingsService.appInsightsConnectionString);
    this.initialValue = this.settingsForm.value;
  }

  public canSubmit(): boolean {
    return this.initialValue.customerApiUrl.trim() != this.settingsForm.value.customerApiUrl.trim() ||
      this.initialValue.orderApiUrl.trim() != this.settingsForm.value.orderApiUrl.trim() ||
      this.initialValue.appInsightsConnectionString.trim() != this.settingsForm.value.appInsightsConnectionString.trim();
  }

  public submit() {
    let form = this.settingsForm.value;

    if (this.settingsService.customerApiUrl.trim() != form.customerApiUrl.trim()) {
      this.settingsService.customerApiUrl = form.customerApiUrl.trim();
    }

    if (this.settingsService.orderApiUrl.trim() != form.orderApiUrl.trim()) {
      this.settingsService.orderApiUrl = form.orderApiUrl.trim();
    }

    if (this.settingsService.appInsightsConnectionString.trim() != form.appInsightsConnectionString.trim()) {
      this.settingsService.appInsightsConnectionString = form.appInsightsConnectionString.trim();
    }

    this.initialValue = this.settingsForm.value;
  }
}
