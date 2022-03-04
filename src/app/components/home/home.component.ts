import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  get showCustomersSection(): boolean {
    return !!this.settingsService.customerApiUrl;
  }

  get showOrdersSection(): boolean {
    return !!this.settingsService.orderApiUrl;
  }

  constructor(private settingsService: SettingsService) { }
}
