import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'counter',
    loadChildren: './client-storage-test/client-storage-test.module#ClientStorageTestModule'
  },
  {
    path: 'counter1',
    loadChildren: './client-storage-test1/client-storage-test1.module#ClientStorageTest1Module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
