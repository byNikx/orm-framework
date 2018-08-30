import { ClientStorageTest1Module } from './client-storage-test1.module';

describe('ClientStorageTest1Module', () => {
  let clientStorageTest1Module: ClientStorageTest1Module;

  beforeEach(() => {
    clientStorageTest1Module = new ClientStorageTest1Module();
  });

  it('should create an instance', () => {
    expect(clientStorageTest1Module).toBeTruthy();
  });
});
