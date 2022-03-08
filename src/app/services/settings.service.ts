import { Injectable } from '@angular/core';

import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _customerApiUrl: string;
  private _orderApiUrl: string;
  private _appInsights: ApplicationInsights;
  private _appInsightsConnectionString: string;

  get customerApiUrl(): string {
    return this._customerApiUrl;
  }

  set customerApiUrl(value: string) {
    localStorage.setItem('customerApiUrl', value);
    this._customerApiUrl = value;
  }

  get orderApiUrl(): string {
    return this._orderApiUrl;
  }

  set orderApiUrl(value: string) {
    localStorage.setItem('orderApiUrl', value);
    this._orderApiUrl = value;
  }

  get appInsightsConnectionString(): string {
    return this._appInsightsConnectionString;
  }

  set appInsightsConnectionString(value: string) {
    localStorage.setItem('appInsightsConnectionString', value);
    this._appInsightsConnectionString = value;
    this.setApplicationInsights();
  }

  get appInsights(): ApplicationInsights {
    return this._appInsights;
  }

  constructor(private router: Router) {
    this._customerApiUrl = localStorage.getItem('customerApiUrl') ?? '';
    this._orderApiUrl = localStorage.getItem('orderApiUrl') ?? '';
    this._appInsightsConnectionString = localStorage.getItem('appInsightsConnectionString') ?? '';
  }

  private setApplicationInsights() {
    if (this._appInsightsConnectionString) {
      var angularPlugin = new AngularPlugin();
      const appInsights = new ApplicationInsights({
        config: {
          connectionString: this._appInsightsConnectionString,
          extensions: [angularPlugin],
          extensionConfig: {
            [angularPlugin.identifier]: { router: this.router }
          }
        }
      });
      appInsights.loadAppInsights();
      this._appInsights = appInsights;
    }
  }
}
