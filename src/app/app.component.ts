import { Component } from '@angular/core';
// @ts-ignore
import {AccountService} from "@app/_services/account.service";
// @ts-ignore
import {User} from "@app/_models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  title: "Login and Register Form";

  constructor() {
    this.user = {
      id: '1',
      username: "Kien",
      password: '123',
      firstName: 'Nguyen',
      lastName: 'Kien',
      token: '12333'
    }
  }

  logout(){
  }

}
