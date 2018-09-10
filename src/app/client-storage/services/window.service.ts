import { Injectable } from '@angular/core';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  get nativeWindow() {
    return window;
  }

}
