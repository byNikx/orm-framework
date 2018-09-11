import { Injectable } from '@angular/core';
import { StorageType, StorageEntry } from './client-storage.interface';

declare const Object: any;

@Injectable()
export class StorageService {
  private _api: any;

  get api(): any {
    return this._api;
  }

  set api(api: any) {
    this._api = api;
  }
  constructor(
    private _config: any,
    private _storageApi: any,
    private _windowRef: any
  ) {
    console.log(this._config, this._storageApi, this._windowRef);
    const storageType: StorageType = this._config.location || StorageType.Local;
    const storage = {
      session: this._sessionStorage(),
      local: null
    };
    const crypto = {
      encrypt: this._config.encrypt || this._crypto().encrypt,
      decrypt: this._config.decrypt || this._crypto().decrypt
    };


    this._config.properties.forEach((property: StorageEntry, index) => {
      const descriptor = {
        enumerable: true,
        set: (value) => {
          if (property.readonly) {
            throw new TypeError(`Cannot assign to readonly property '${property.name}'.`);
          } else {
            if (this._config.encryption) {
              value = crypto.encrypt(value);
            }
            storage[storageType].save(property.name, value, this._config.namespace);
          }
        },
        get: () => {
          let value = storage[storageType].get(property.name, this._config.namespace);
          if (value && this._config.encryption) {
            value = crypto.decrypt(value);
          }
          return value;
        }
      };
      Object.defineProperty(this._storageApi, property.name, descriptor);
      if (property.readonly) {
        if (property.value) {
          storage[storageType].save(property.name, property.value, this._config.namespace);
        } else {
          throw new ReferenceError(`Readonly property '${property.name}' must be initialized.`);
        }
      } else {
        if (property.value) {
          this._storageApi[property.name] = property.value;
        }
      }
    });

    this.api = this._storageApi;
  }

  /**
   * A private factory that provides methods for
   * encryption and decryption.
   */
  private _crypto() {
    const window = this._windowRef.nativeWindow;
    return {
      encrypt(value) {
        return window.btoa(value);
      },
      decrypt(value) {
        return window.atob(value);
      }
    };
  }
  /**
   * A private method that defines helper methods for
   * session storage.
   */
  private _sessionStorage() {
    const storage = this._windowRef.nativeWindow.sessionStorage;
    if (!storage) {
      throw new ReferenceError('Session storage is not available.');
    }

    return {
      /**
       * Save data to session storage.
       * @param key
       * @param value
       * @param namespace
       */
      save: (key: string, value: any, namespace?: string): void => {
        value = {
          value,
          type: typeof value
        };
        const parsedValue = JSON.stringify(value);
        let internalKey = key;
        if (namespace) {
          internalKey = [namespace, key].join('.');
        }
        storage.setItem(internalKey, parsedValue);
      },
      /**
       * Fetch data from session storage associated with the key.
       * @param key
       * @param namespace
       */
      get: (key: string, namespace?: string) => {
        let internalKey = key;
        if (namespace) {
          internalKey = [namespace, key].join('.');
        }
        const rawValue = storage.getItem(internalKey);
        if (rawValue) {
          const json = this._parseJSON(rawValue);
          if (json) {
            return json.value;
          } else {
            return rawValue.value;
          }
        } else {
          return rawValue;
        }
      }

    };
  }

  /**
   * Checks if value is parsable JSON string
   * and returns the parsed string if it is,
   * otherwise returns false.
   * @param value
   * @returns prased json object or boolean
   */
  private _parseJSON(value: string): any {
    try {
      const json = JSON.parse(value);
      if (json && typeof json === 'object') {
        return json;
      }
    } catch (e) {
      console.log('error while parsing JSON: ', e);
    }
    return false;
  }

}
