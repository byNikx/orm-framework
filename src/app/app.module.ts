import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientStorageModule } from './client-storage/client-storage.module';
import { TestComponent } from './components/test/test.component';
import { AppRoutingModule } from './app-routing.module';

const CONFIG = {
  "location": "local",
  "properties": [
    {
      "name": "testSession",
      "value": 112312,
      "location": "session",
      "readonly": true
    },
    {
      "name": "testlocal",
      "value": 2,
      "location": "local"
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    ClientStorageModule.config(CONFIG),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
