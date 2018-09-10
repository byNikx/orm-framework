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

export enum StorageType {
  Local = 'local',
  Session = 'session'
}
export interface StorageEntry {
  name: string;
  //  location: StorageType;
  value?: any;
  readonly?: boolean;
}
export interface StorageConfig {
  encryption?: boolean;
  encrypt?: Function;
  decrypt?: Function;
  namespace?: string;
  location: StorageType;
  properties: StorageEntry[];
}


