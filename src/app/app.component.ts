import { Component, Inject } from '@angular/core';
import { StorageService } from '../../projects/orm/src/public_api';


// class Person {
//   constructor(public name: string) { }
// }

// class Tabish extends Person {
//   constructor(name) {
//     super(name);
//     console.log(this.name);
//   }
// }

// const person: Person = new Person('Nadeem');
// const tabish: Tabish = new Tabish('tabish');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(@Inject(StorageService) public storage: any) {
    //    console.log(this.storage.testlocal.remove);
    //console.log(this.storage.testlocal.remove.prototype === this.storage.__proto__.remove.prototype);
    //    console.log(person.name);

  }
  update(e) {
    this.storage.testlocal = e.target.value;
  }
}
