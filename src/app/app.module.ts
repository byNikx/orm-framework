import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  ClientStorageModule,
  StorageConfig,
  StorageType
} from '../../projects/orm/src/public_api';
import { CounterComponent } from './counter/counter.component';
import { Counter1Component } from './counter1/counter1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
//import { StorageService } from "orm/public_api";

const CONFIG: StorageConfig = {
  storage: StorageType.Local,
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
      storage: StorageType.Session
    }
  ]
};

@NgModule({
  declarations: [AppComponent, CounterComponent, Counter1Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ClientStorageModule.config(CONFIG)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
