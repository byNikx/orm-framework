import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [StorageService]
})

export class ClientStorageModule {
  static config(config: any): ModuleWithProviders<ClientStorageModule> {
    //    console.log('forRoot');
    return {
      ngModule: ClientStorageModule,
      providers: [StorageService]
    };
  }
}
