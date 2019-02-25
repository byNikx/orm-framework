import { Component, Inject } from '@angular/core';
import { StorageService } from '../../projects/orm/src/public_api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface StorageData {
  testSession: string;
  testLocal: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  joiningForm: FormGroup;

  debugger;
  constructor(
    @Inject(StorageService) public storage: any,
    private formBuilder: FormBuilder
  ) {}
  update(e) {
    this.storage.testlocal = e.target.value;
  }

  ngOnInit(): void {
    this.joiningForm = this.formBuilder.group({
      username: ['', [Validators.required]]
    });
  }
}
