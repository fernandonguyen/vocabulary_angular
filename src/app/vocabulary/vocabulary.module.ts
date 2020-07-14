import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './vocabulary.component';


@NgModule({
  declarations: [VocabularyComponent],
  imports: [
    CommonModule,
    VocabularyRoutingModule
  ]
})
export class VocabularyModule { }
