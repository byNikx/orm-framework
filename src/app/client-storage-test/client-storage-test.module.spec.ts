import { ClientStorageTestModule } from './client-storage-test.module';

describe('ClientStorageTestModule', () => {
  let clientStorageTestModule: ClientStorageTestModule;

  beforeEach(() => {
    clientStorageTestModule = new ClientStorageTestModule();
  });

  it('should create an instance', () => {
    expect(clientStorageTestModule).toBeTruthy();
  });
});
