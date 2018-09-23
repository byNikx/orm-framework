
export enum StorageType {
    Local = 'local',
    Session = 'session'
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
    Enable = 'enable',
    Disable = 'disable'
}
export interface StorageConfig {
    encryption?: boolean;
    encrypt?: Function;
    decrypt?: Function;
    namespace?: string;
    storage: StorageType;
    properties: StorageEntry[];
}
