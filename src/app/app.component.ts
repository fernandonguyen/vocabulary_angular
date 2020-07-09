import { Component } from '@angular/core';
import {AccountService} from '@app/_services/account.service';
import {User} from '@app/_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  title: 'Login and Register Form';

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout(){
    this.accountService.logout();
  }

}
