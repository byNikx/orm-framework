import { NgModule, ModuleWithProviders, InjectionToken, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STORAGE_PROVIDER, CONFIG, STORAGE_API } from './client-storage.config';
import { StorageService } from './storage.service';
import { WindowService } from './window.service';



@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: []
})

export class ClientStorageModule {



  static config(config: any): ModuleWithProviders<ClientStorageModule> {

    return {
      ngModule: ClientStorageModule,
      providers: [
        WindowService,
        STORAGE_PROVIDER,
        {
          provide: CONFIG,
          useValue: config
        },
        {
          provide: StorageService,
          useFactory: storageServiceFactory
        }
      ]
    };
  }
}

export function storageServiceFactory() {
  return new StorageService(inject(CONFIG), inject(STORAGE_API), inject(WindowService)).api;
}



