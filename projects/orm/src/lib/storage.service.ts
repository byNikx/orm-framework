import {
  StorageType,
  StorageEntry,
  StorageConfig,
  JSTypes
} from './client-storage.interface';
import { WindowService } from './window.service';

declare const Object: any;

export class StorageService {
  // Api container
  private _api: any;
  get api(): any {
    return this._api;
  }
  set api(api: any) {
    this._api = api;
  }

  private _config: StorageConfig;
  get config(): StorageConfig {
    return this._config;
  }
  set config(config: StorageConfig) {
    this._config = config;
  }

  constructor(_storageConfig: any, _storageApi: any, _windowRef: any) {
    this.config = _storageConfig;
    const globalStorage: StorageType =
      this.config.storage || StorageType.Session;

    // Configure cryptographic functions
    const crypto = {
      encrypt: this.config.encryptFn || _crypto(_windowRef).encrypt,
      decrypt: this.config.decryptFn || _crypto(_windowRef).decrypt
    };

    const storage = {
      sessionStorage: _Storage(StorageType.Session, _windowRef),
      localStorage: _Storage(StorageType.Local, _windowRef),
      active: new Set([])
    };

    _storageApi.clear = (): void => {
      storage.active.forEach((type: StorageType) => {
        storage[type].clear();
      });
    };
    // _storageApi.remove = function(param): void {
    //   console.log('removing', param);
    // };

    this.config.properties.forEach((property: StorageEntry, index) => {
      // If property name is undefined or null then stop
      if (!property.name) {
        throw new TypeError(`${property.name} is not a valid property name.`);
      }

      // Setting up active storage
      let activeStorage = globalStorage;
      if (property.storage) {
        activeStorage = property.storage;
      }
      storage.active.add(activeStorage);

      const descriptor = {
        enumerable: true,
        set: value => {
          if (property.readonly) {
            throw new TypeError(
              `Cannot assign to readonly property '${property.name}'.`
            );
          } else {
            const payload = {
              value,
              type: typeof value
            };
            if (this.config.encryption) {
              if (typeof value === 'object') {
                value = JSON.stringify(value);
              }
              payload.value = crypto.encrypt(value);
            }
            storage[activeStorage].save(
              property.name,
              payload,
              this.config.namespace
            );
          }
        },
        get: () => {
          const item: { type: any; value: any } = storage[activeStorage].get(
            property.name,
            this.config.namespace
          );
          if (item) {
            if (this.config.encryption) {
              item.value = crypto.decrypt(item.value);
            }
            return _getTrueValue(item, this.config.encryption);
          }
          return item;
        }
      };
      const descriptor1 = {};
      Object.defineProperty(_storageApi, property.name, descriptor);
      if (property.readonly) {
        let value = property.value;
        if (value) {
          const payload = {
            value,
            type: typeof value
          };
          if (this.config.encryption) {
            if (typeof value === 'object') {
              value = JSON.stringify(value);
            }
            payload.value = crypto.encrypt(value);
          }
          storage[activeStorage].save(
            property.name,
            payload,
            this.config.namespace
          );
        } else {
          throw new ReferenceError(
            `Readonly property '${property.name}' must be initialized.`
          );
        }
      } else {
        if (property.value) {
          _storageApi[property.name] = property.value;
        }
      }
    });

    this.api = _storageApi;
  }
}

/**
 * A private module that provides methods for
 * encryption and decryption.
 */
export function _crypto(windowRef: WindowService) {
  const window = windowRef.nativeWindow;
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
export function _Storage(
  storageType: StorageType,
  windowRef: WindowService,
  debug?: boolean
): any {
  const storage = windowRef.nativeWindow[storageType];
  if (!storage) {
    throw new ReferenceError(`Storage type ${storageType} is not available.`);
  }
  function _isUsable() {
    try {
      storage.setItem('_isUsable', 'usable');
      storage.removeItem('_isUsable');
      return true;
    } catch (e) {
      return false;
    }
  }
  function _generateKey(key: string, namespace: string): string {
    if (namespace) {
      key = [namespace, key].join('.');
    }
    return key;
  }

  if (!_isUsable()) {
    console.warn(`${storageType} is not usable`);
    console.warn(`using fallback storage`);
  }

  return {
    /**
     * Save data to session storage.
     * @param key
     * @param value
     * @param namespace
     */
    save: (key: string, value: any, namespace?: string): void => {
      const parsedValue = JSON.stringify(value);
      const internalKey = _generateKey(key, namespace);
      storage.setItem(internalKey, parsedValue);
    },

    /**
     * Fetch data from session storage associated with the key.
     * @param key
     * @param namespace
     */
    get: (key: string, namespace?: string): any => {
      const internalKey = _generateKey(key, namespace);
      const rawValue = storage.getItem(internalKey);
      if (rawValue) {
        const json = _parseJSON(rawValue);
        if (json) {
          return json;
        } else {
          return rawValue;
        }
      } else {
        return rawValue;
      }
    },

    /**
     * Removes key from session storage.
     * @param key
     * @param namespace
     */
    remove(key: string, namespace?: string): void {},

    // Remove all saved data from sessionStorage
    clear(): void {
      storage.clear();
    }
  };
}

export function _locationHashStorage(windowRef: WindowService) {
  const window = windowRef.nativeWindow;
  console.log(window);
}

/**
 * Checks if value is parsable JSON string
 * and returns the parsed string if it is,
 * otherwise returns false.
 * @param value
 * @returns prased json object or boolean
 */
export function _parseJSON(value: string): any {
  try {
    const json = JSON.parse(value);
    if (json && typeof json === 'object') {
      return json;
    }
  } catch (e) {
    //    console.log('error while parsing JSON: ', e);
  }
  return false;
}

/**
 * Coverts value from string to it's original type.
 * @param item
 */
export function _getTrueValue(
  item: { type: any; value: any },
  encryption: boolean = false
): any {
  switch (item.type) {
    case JSTypes.Number:
      return Number.parseInt(item.value, 10);
    case JSTypes.String:
      return item.value;
    case JSTypes.Boolean:
      let value = item.value;
      if (typeof value === JSTypes.String) {
        value = item.value.toLowerCase();
      }
      if (encryption) {
        return value === 'true';
      }
      return value;
    case JSTypes.Array:
      return JSON.parse(item.value);
    default:
      if (encryption) {
        return JSON.parse(item.value);
      }
      return item.value;
  }
}
