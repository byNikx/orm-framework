import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientStorageModule } from './client-storage/client-storage.module';
import { TestComponent } from './components/test/test.component';

const CONFIG = {
  "location": "local",
  "properties": [
    {
      "name": "testSession",
      "location": "session",
      "writable": false
    },
    {
      "name": "testlocal",
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
    ClientStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
