import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VocabularyRoutingModule } from './vocabulary-routing.module';
import { VocabularyComponent } from './vocabulary.component';
import { AddEditVocabularyComponent } from './add-edit-vocabulary.component';
import { ListVocabularyComponent } from './list-vocabulary.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { FlashCardComponent } from './flash-card.component';

@NgModule({
  declarations: [VocabularyComponent, AddEditVocabularyComponent, ListVocabularyComponent, FlashCardComponent],
    imports: [
        CommonModule,
        VocabularyRoutingModule,
        ReactiveFormsModule,
        AngularEditorModule
    ]
})
export class VocabularyModule { }
