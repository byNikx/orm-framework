import { StorageService, _getTrueValue, _parseJSON } from './storage.service';
import { WindowService } from './window.service';
import { StorageConfig, StorageType, Encryption } from './client-storage.interface';
import { toBeArray, toBeNumber, toBeBoolean, toBeString, toBeInstanceOf } from '../custom-matchers.jasmine';

export class Employee {
  company: string;
  email: string;
}

describe('StorageService', () => {
  const config: StorageConfig = {
    storage: StorageType.Session,
    namespace: 'test',
    encryption: true,
    properties: [
      {
        name: 'price',
        readonly: true,
        value: 1234
      }, {
        name: 'quantity',
        value: 2,
      }, {
        name: 'number',
        value: 19897987333
      }, {
        name: 'string',
        value: 'hello world'
      }, {
        name: 'boolean',
        value: true
      }, {
        name: 'object',
        value: {
          company: 'Bankdata',
          email: 'bdynad@bankdata.dk'
        }
      }
    ]
  };
  let storageService: any;
  let storageServiceCore: any;
  beforeEach(() => {
    storageServiceCore = new StorageService(config, {}, new WindowService());
    storageService = storageServiceCore.api;
    jasmine.addMatchers(toBeArray);
    jasmine.addMatchers(toBeNumber);
    jasmine.addMatchers(toBeBoolean);
    jasmine.addMatchers(toBeString);
    jasmine.addMatchers(toBeInstanceOf);
  });

  it('should be created with provided configuration', () => {

    // Service should be created
    expect(storageService).toBeTruthy();

    // Encryption should be disabled
    expect(storageServiceCore.config.encryption).toBe(true);

    // Namespace should be `test`
    expect(storageServiceCore.config.namespace).toBe('test');

    // Default storage should be SessionStorage
    expect(storageServiceCore.config.storage).toBe(StorageType.Session);

    // Storage property should be a non empty array
    expect(storageServiceCore.config.properties).toBeArray();

    // Custom encrption and decryption strategies should not be defined
    expect(storageServiceCore.config.encrypt).toBeFalsy();
    expect(storageServiceCore.config.decrypt).toBeFalsy();

    // `price` field should be set to `1234`
    expect(storageService.price).toBe(1234);

    // `quantity` field should be set to `2`
    expect(storageService.quantity).toBe(2);

    // `number` field should be set to `19897987333`
    expect(storageService.number).toBe(19897987333);

    // `string` field should be set to `hello world`
    expect(storageService.string).toBe('hello world');

    // `boolean` field should be set to `true`
    expect(storageService.boolean).toBe(true);

    // `array` field should be set to `[1,2,3,4,5]`
    //    expect(storageService.array).toEqual([1, 2, 3, 4, 5]);

    // `object` field should be set to `{ company: 'Bankdata', email: 'bdynad@bankdata.dk' }`
    expect(storageService.object).toEqual({
      company: 'Bankdata',
      email: 'bdynad@bankdata.dk'
    });

  });



  it('should preserve `type` of data', () => {

    // `number` field should be of type `number`
    expect(storageService.number).toBeNumber();

    // `string` field should be of type `string`
    expect(storageService.string).toBeString();

    // `boolean` field should be set to `true`
    expect(storageService.boolean).toBeBoolean();

    // `array` field should be set to [1,2,3,4, 5]
    //    expect(storageService.array).toBeArray();

    // Properties of object `{ company: 'Bankdata', email: 'bdynad@bankdata.dk' }
    // should be accessible via dot and bracket notion both`
    expect(storageService.object.company).toBe('Bankdata');
    expect(storageService.object.email).toBe('bdynad@bankdata.dk');
    expect(storageService.object['company']).toBe('Bankdata');
    expect(storageService.object['email']).toBe('bdynad@bankdata.dk');

  });

  it('should throw `TypeError` if a new value is assigned to a readonly property', () => {
    expect(() => storageService.price = 1).toThrowError(TypeError);
  });


  it('should be able to save in session storage with encryption', () => {
    const value = 1982;
    config.encryption = true;
    spyOn(sessionStorage, 'setItem');
    storageService.quantity = value;
    expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('test.quantity', '{"value":"MTk4Mg==","type":"number"}');
  });

  it('should be able to save in session storage without encryption', () => {
    const value = 1982;
    config.encryption = false;
    spyOn(sessionStorage, 'setItem');
    storageService.quantity = value;
    expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('test.quantity', '{"value":1982,"type":"number"}');
  });

  it('should be able to fetch data from session storage', () => {
    spyOn(sessionStorage, 'getItem');
    const quantity = storageService.quantity;
    expect(sessionStorage.getItem).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem).toHaveBeenCalledWith('test.quantity');
  });

  it('should be able to clear session storage via clear() method', () => {
    spyOn(sessionStorage, 'clear');
    storageService.clear();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });

  it('should work without namespace', () => {
    config.namespace = null;
    // `number` field should be of type `number`
    expect(storageService.number).toBeNumber();

    // `string` field should be of type `string`
    expect(storageService.string).toBeString();

    // `boolean` field should be set to `true`
    expect(storageService.boolean).toBeBoolean();

    // `array` field should be set to [1,2,3,4, 5]
    //    expect(storageService.array).toBeArray();

    // Properties of object `{ company: 'Bankdata', email: 'bdynad@bankdata.dk' }
    // should be accessible via dot and bracket notion both`
    expect(storageService.object.company).toBe('Bankdata');
    expect(storageService.object.email).toBe('bdynad@bankdata.dk');
    expect(storageService.object['company']).toBe('Bankdata');
    expect(storageService.object['email']).toBe('bdynad@bankdata.dk');
  });

  describe('Utility method', () => {

    it('_getTrueValue should return value with true type', () => {
      expect(_getTrueValue({ type: 'number', value: '1234567890' })).toBeNumber();
    });

    it('_parseJSON should return parsed javaScript object or false', () => {
      expect(_parseJSON('{"name":"Nadeem", "email":"bdynad@bankdata.dk"}')).toEqual({
        name: 'Nadeem',
        email: 'bdynad@bankdata.dk'
      });
      expect(_parseJSON('[object]')).toBe(false);
    });

  });

});
