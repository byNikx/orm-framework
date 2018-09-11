import { Injectable } from '@angular/core';

declare const window: any;

@Injectable()
export class WindowService {

  constructor() { }

  get nativeWindow() {
    return window;
  }

}
