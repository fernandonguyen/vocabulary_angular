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
  isTogger : boolean = false;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout(){
    this.accountService.logout();
  }

  toggerNav(event) {
    event.preventDefault();
    if (!this.isTogger) {
      document.getElementById('wrapper').setAttribute('class','d-flex toggled');
      this.isTogger = true;
      //document.getElementsByClassName("app-container")[0].
    } else {
      document.getElementById('wrapper').setAttribute('class','d-flex');
      this.isTogger = false;
    }
  }

}
