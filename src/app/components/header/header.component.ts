import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get showCustomerSection(): boolean {
    return !!this.settingsService.customerApiUrl;
  }

  get showOrderSection(): boolean {
    return !!this.settingsService.orderApiUrl;
  }

  constructor(private settingsService: SettingsService) { }
}
