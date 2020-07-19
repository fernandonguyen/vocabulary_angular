import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "@app/_models";
import {AccountService} from "@app/_services/account.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class FlashCardComponent implements OnInit {

  currentUser: User;
  vocabularys = [
    {
      id: '',
      word: '',
      mean: '',
      lang: '',
      des: '',
      idUser: '',
    }
  ];
  index: number = 0;
  constructor(private accountService: AccountService) {
    this.currentUser = accountService.userValue;
  }

  ngOnInit(): void {
    this.accountService.getVocabularyByUser(this.currentUser.id).pipe(first()).subscribe( vocabularys => {
      this.vocabularys = vocabularys;
    } );
  }

  flip: string = 'inactive';

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  previous() {
    if (this.index > 0) {
      this.index--;
    }
  }

  next() {
    if (this.index < this.vocabularys.length-1) {
      this.index++;
    }
  }

}
