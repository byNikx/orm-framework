import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';

export const STORAGE_API = new InjectionToken('STORAGE_API');

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
        {
          provide: STORAGE_API,
          multi: true,
          useClass: StorageService
        },
        generateGetterSetter(config),
      ]
    };
  }
}


export function generateGetterSetter(config): any {
  //  const getterSetter = {};

  return {
    provide: STORAGE_API,
    multi: true,
    useValue: {}
  };
}


