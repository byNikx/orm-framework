import { NgModule, ModuleWithProviders, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STORAGE_PROVIDER, CONFIG, STORAGE_API } from './client-storage.config';
import { StorageService } from './storage.service';
import { WindowService } from './window.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: []
})
export class ClientStorageModule {
  static config(config: any): ModuleWithProviders {
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
          useFactory: storageServiceFactory,
          deps: [CONFIG, STORAGE_API, WindowService]
        }
      ]
    };
  }
}

/**
 * Angula5 5.0.x onwards
 */
// export function storageServiceFactory(config: any, storageApi: any, windowService: WindowService) {
//   return new StorageService(config, storageApi, windowService).api;
// }

/**
 * Angular 6.0.x compatible
 */
export function storageServiceFactory() {
  return new StorageService(
    inject(CONFIG),
    inject(STORAGE_API),
    inject(WindowService)
  ).api;
}
