import { Component, OnInit } from '@angular/core';
import {User, Vocabulary} from '@app/_models';
import {AccountService} from '@app/_services/account.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-list-vocabulary',
  templateUrl: './list-vocabulary.component.html',
  styleUrls: ['./list-vocabulary.component.css']
})
export class ListVocabularyComponent implements OnInit {

  currentUser: User;
  vocabularys = null;

  constructor(private accountService: AccountService) {
    this.currentUser = accountService.userValue;
  }

  ngOnInit(): void {
    this.accountService.getVocabularyByUser(this.currentUser.id).pipe(first()).subscribe( vocabularys => this.vocabularys = vocabularys );
  }

  deleteVocabulary(id) {
    const vocabulary = this.vocabularys.find(x => x.id === id);
    vocabulary.isDeleting = true;
    this.accountService.deleteVocabulary(id).pipe(first())
        .subscribe(() => {
          this.vocabularys = this.vocabularys.filter(x => x.id !== id);
        });
  }

}
