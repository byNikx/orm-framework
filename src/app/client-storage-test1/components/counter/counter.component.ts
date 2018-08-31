import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../client-storage/services/storage.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter: any;
  constructor(public storage: StorageService) {
  }

  ngOnInit() {
  }

  test() {
  }

}
