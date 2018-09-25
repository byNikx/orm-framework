import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { Counter1Component } from './counter1/counter1.component';

const routes: Routes = [
  {
    path: 'counter',
    component: CounterComponent
    //loadChildren: './client-storage-test/client-storage-test.module#ClientStorageTestModule'
  },
  {
    path: 'counter1',
    component: Counter1Component
    //loadChildren: './client-storage-test1/client-storage-test1.module#ClientStorageTest1Module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
