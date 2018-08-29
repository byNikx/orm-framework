import { ClientStorageModule } from './client-storage.module';

describe('ClientStorageModule', () => {
  let clientStorageModule: ClientStorageModule;

  beforeEach(() => {
    clientStorageModule = new ClientStorageModule();
  });

  it('should create an instance', () => {
    expect(clientStorageModule).toBeTruthy();
  });
});
