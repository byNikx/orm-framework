import { Injectable, Inject, inject } from '@angular/core';
import { CONFIG, STORAGE_API } from '../client-storage.config';

declare const Object: any;

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    const storage = new StorageService(inject(CONFIG), inject(STORAGE_API));
    return storage.api;
  }
})
export class StorageService {
  _api: any;

  get api(): any {
    return this._api;
  }

  set api(api: any) {
    this._api = api;
  }
  constructor(
    _config: any,
    _storageApi: any,
  ) {

    _config.properties.forEach((property, index) => {
      // const descriptor = Object.keys(property).reduce(() => {

      // });
      Object.defineProperty(_storageApi, property.name, {
        enumerable: true,
        set(value) {
          property.name = value;
        },
        get() {
          //          console.log(this[property.name]);
          return property.name;
        }
      });

      if (property.value) {
        _storageApi[property.name] = property.value;
      }

    });
    this.api = _storageApi;
  }
}
