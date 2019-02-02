import { Component, Inject } from "@angular/core";
import { StorageService } from "../../projects/orm/src/public_api";

export interface StorageData {
  testSession: string;
  testLocal: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  constructor(@Inject(StorageService) public storage: any) {}
  update(e) {
    this.storage.testlocal = e.target.value;
  }
}
