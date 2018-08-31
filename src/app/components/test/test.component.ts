import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../client-storage/services/storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  counter: any;
  constructor(private storage: StorageService) {
  }

  ngOnInit() {
  }

  test() {
  }

}
