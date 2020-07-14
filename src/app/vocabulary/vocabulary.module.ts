import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './vocabulary.component';
import { AddEditVocabularyComponent } from './add-edit-vocabulary.component';
import { ListVocabularyComponent } from './list-vocabulary.component';


@NgModule({
  declarations: [VocabularyComponent, AddEditVocabularyComponent, ListVocabularyComponent],
  imports: [
    CommonModule,
    VocabularyRoutingModule
  ]
})
export class VocabularyModule { }
