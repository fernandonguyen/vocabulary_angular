import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyComponent } from './vocabulary.component';
import {AddEditVocabularyComponent} from '@app/vocabulary/add-edit-vocabulary.component';
import {ListVocabularyComponent} from '@app/vocabulary/list-vocabulary.component';
import {FlashCardComponent} from "@app/vocabulary/flash-card.component";

const routes: Routes = [
    {
        path: '', component: VocabularyComponent,
        children: [
            { path: '', component: ListVocabularyComponent },
            { path: 'add-vocabulary', component: AddEditVocabularyComponent },
            { path: 'add-vocabulary/:id', component: AddEditVocabularyComponent },
            { path: 'flash-card', component: FlashCardComponent },
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VocabularyRoutingModule { }
