import { Component, Inject } from '@angular/core';
import { StorageService } from '@nikx/orm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(@Inject(StorageService) public storage: any) {
    console.log(this.storage);
  }
  update(e) {
    this.storage.testlocal = e.target.value;
  }
}
