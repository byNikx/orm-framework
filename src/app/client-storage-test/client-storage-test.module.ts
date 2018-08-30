import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './components/counter/counter.component';
import { ClientStorageTestRoutingModule } from './client-storage-test-routing.module';
import { ClientStorageModule } from '../client-storage/client-storage.module';

@NgModule({
  imports: [
    CommonModule,
    ClientStorageTestRoutingModule,
  ],
  declarations: [CounterComponent]
})
export class ClientStorageTestModule { }
