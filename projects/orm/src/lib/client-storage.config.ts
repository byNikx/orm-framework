import { InjectionToken } from '@angular/core';

export const STORAGE_API = new InjectionToken('STORAGE_API');
export const CONFIG = new InjectionToken('CONFIG');

export const STORAGE_PROVIDER = {
    provide: STORAGE_API,
    useValue: {}
};
