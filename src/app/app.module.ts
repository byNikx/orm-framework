import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientStorageModule, StorageConfig, StorageType } from '../../projects/orm/src/public_api';

const CONFIG: StorageConfig = {
  location: StorageType.Session,
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
  ],
  imports: [
    BrowserModule,
    ClientStorageModule.config(CONFIG),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
