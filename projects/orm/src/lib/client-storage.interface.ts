export enum StorageType {
  Local = "localStorage",
  Session = "sessionStorage",
  IndexedDB = "indexedDB"
}

export enum JSTypes {
  String = "string",
  Object = "object",
  Number = "number",
  Boolean = "boolean",
  Array = "array"
}
export interface StorageEntry {
  name: string;
  storage?: StorageType;
  value?: any;
  readonly?: boolean;
}

export interface EncryptionConfig {
  status: Encryption;
  encryptionStrategy?: Function;
  decryptionStrategy?: Function;
}

export enum Encryption {
  Enable = "enable",
  Disable = "disable"
}
export interface StorageConfig {
  encryption?: boolean;
  encryptFn?: Function;
  decryptFn?: Function;
  namespace?: string;
  storage: StorageType;
  properties: StorageEntry[];
}
