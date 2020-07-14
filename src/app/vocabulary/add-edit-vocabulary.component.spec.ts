import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVocabularyComponent } from './add-edit-vocabulary.component';

describe('AddEditVocabularyComponent', () => {
  let component: AddEditVocabularyComponent;
  let fixture: ComponentFixture<AddEditVocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditVocabularyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
