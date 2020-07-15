import { Component, OnInit } from '@angular/core';
import {User} from "@app/_models";

@Component({
  selector: 'app-list-vocabulary',
  templateUrl: './list-vocabulary.component.html',
  styleUrls: ['./list-vocabulary.component.css']
})
export class ListVocabularyComponent implements OnInit {

  users: User[] = [{
    id : '1',
    username : 'Kien',
    password : '',
    firstName : '',
    lastName : '',
    token : ''
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  deleteUser(id) {

  }

}
