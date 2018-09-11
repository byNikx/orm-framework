export enum StorageType {
    Local = 'local',
    Session = 'session'
}
export interface StorageEntry {
    name: string;
    //  location: StorageType;
    value?: any;
    readonly?: boolean;
}
export interface StorageConfig {
    encryption?: boolean;
    encrypt?: Function;
    decrypt?: Function;
    namespace?: string;
    location: StorageType;
    properties: StorageEntry[];
}