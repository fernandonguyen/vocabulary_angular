import {Component, OnInit} from '@angular/core';
import {AccountService} from '@app/_services/account.service';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users = null;
 // items = [];
  pageOfItems: Array<any>;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.getAll().pipe(first()).subscribe(users => this.users = users);
    //this.items = Array(this.users.length).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id).pipe(first())
      .subscribe(() => {
        this.users = this.users.filter(x => x.id !== id);
      });
  }
}
