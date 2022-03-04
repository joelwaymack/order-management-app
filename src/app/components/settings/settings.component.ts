import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
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
  }

  public submit() {
    let form = this.settingsForm.value;

    if (this.settingsService.customerApiUrl != form.customerApiUrl) {
      this.settingsService.customerApiUrl = form.customerApiUrl;
    }

    if (this.settingsService.orderApiUrl != form.orderApiUrl) {
      this.settingsService.orderApiUrl = form.orderApiUrl;
    }

    if (this.settingsService.appInsightsConnectionString != form.appInsightsConnectionString) {
      this.settingsService.appInsightsConnectionString = form.appInsightsConnectionString;
    }
  }
}
