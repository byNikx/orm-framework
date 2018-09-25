import { Component, OnInit, Inject } from '@angular/core';
import { StorageService } from '../../../projects/orm/src/public_api';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  constructor(@Inject(StorageService) public storage: any) {

  }

  ngOnInit() {
  }

}
