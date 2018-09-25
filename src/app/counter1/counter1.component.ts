import { Component, OnInit, Inject } from '@angular/core';
import { StorageService } from '../../../projects/orm/src/lib/storage.service';

@Component({
  selector: 'app-counter1',
  templateUrl: './counter1.component.html',
  styleUrls: ['./counter1.component.css']
})
export class Counter1Component implements OnInit {

  constructor(@Inject(StorageService) public storage: any) {

  }

  ngOnInit() {
  }

}
