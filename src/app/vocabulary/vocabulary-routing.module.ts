import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocabularyComponent } from './vocabulary.component';
import {AddEditVocabularyComponent} from "@app/vocabulary/add-edit-vocabulary.component";
import {LayoutComponent} from "@app/users/layout.component";
import {ListComponent} from "@app/users/list.component";
import {AddEditComponent} from "@app/users/add-edit.component";
import {ListVocabularyComponent} from "@app/vocabulary/list-vocabulary.component";

const routes: Routes = [
    {
        path: '', component: VocabularyComponent,
        children: [
            { path: '', component: ListVocabularyComponent },
            { path: 'add-vocabulary', component: AddEditVocabularyComponent },
            { path: 'add-vocabulary/:id', component: AddEditVocabularyComponent }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VocabularyRoutingModule { }
