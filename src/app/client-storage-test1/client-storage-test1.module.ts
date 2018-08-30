import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientStorageTest1RoutingModule } from './client-storage-test1-routing.module';
import { CounterComponent } from './components/counter/counter.component';
import { ClientStorageModule } from '../client-storage/client-storage.module';

@NgModule({
  imports: [
    CommonModule,
    ClientStorageTest1RoutingModule,
  ],
  declarations: [CounterComponent]
})
export class ClientStorageTest1Module { }
