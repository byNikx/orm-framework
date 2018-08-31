import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STORAGE_PROVIDER, CONFIG } from './client-storage.config';



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
        STORAGE_PROVIDER,
        {
          provide: CONFIG,
          useValue: config
        }
      ]
    };
  }
}


export function getterSettersProvider(config) {

  // return {
  //   provide: STORAGE_API,
  //   multi: true,
  //   useValue: {}
  // };
}


