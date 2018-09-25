import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientStorageModule, StorageConfig, StorageType, Encryption } from '../../projects/orm/src/public_api';
import { CounterComponent } from './counter/counter.component';
import { Counter1Component } from './counter1/counter1.component';

const CONFIG: StorageConfig = {
  storage: StorageType.Session,
  namespace: 'app',
  encryption: true,
  properties: [
    {
      name: 'testSession',
      readonly: true,
      value: 1234
    },
    {
      name: 'testlocal',
      value: 2,
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    Counter1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientStorageModule.config(CONFIG),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
