import { Component } from '@angular/core';
import { StorageService } from './client-storage/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public storage: StorageService) {
    //    this.storage['testlocal'] = 22222222;
    console.log(this.storage['testSession']);
  }
}
