import { ClientStorageModule } from './client-storage.module';
import { StorageConfig, StorageType } from './client-storage.interface';
import { toBeInstanceOf } from '../custom-matchers.jasmine';
import { storageServiceFactory } from './client-storage.module';
import { StorageService } from './storage.service';

const config: StorageConfig = {
  storage: StorageType.Session,
  namespace: 'test',
  encryption: false,
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
    }, {
      name: 'array',
      value: [1, 2, 3, 4, 5]
    }, {
      name: 'function',
      value: ''
    }
  ]
};
describe('ClientStorageModule', () => {
  let clientStorageModule: ClientStorageModule;

  beforeEach(() => {
    clientStorageModule = ClientStorageModule.config(config);
    jasmine.addMatchers(toBeInstanceOf);
  });

  it('should create an instance', () => {
    expect(clientStorageModule).toBeTruthy();
  });

  describe('Storage Factory `storageServiceFactory`', () => {
    it('should create factory for Storage Service', () => {
      //      expect(storageServiceFactory()).toBeInstanceOf(StorageService);
    });
  });
});
