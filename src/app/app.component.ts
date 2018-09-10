import { Component, Inject } from '@angular/core';
import { StorageService } from './client-storage/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(@Inject(StorageService) private storage: any) {
  }
  update(e) {
    this.storage.testlocal = e.target.value;
  }
}
