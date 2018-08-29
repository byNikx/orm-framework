import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  _counter: any = 0;
  get counter() {
    return this._counter;
  }

  set counter(count) {
    this._counter = count;
  }

  increment() {
    console.log('incremented');
    this.counter += 1;

    console.log(this.counter);
  }
}
