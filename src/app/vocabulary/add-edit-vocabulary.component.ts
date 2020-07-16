import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '@app/_services/account.service';
import {AlertService} from '@app/_services/alert.service';
import {first} from 'rxjs/operators';
import {AngularEditorConfig, AngularEditorModule} from '@kolkov/angular-editor';
import {User} from '@app/_models';

@Component({
  selector: 'app-add-edit-vocabulary',
  templateUrl: './add-edit-vocabulary.component.html',
  styleUrls: ['./add-edit-vocabulary.component.css']
})
export class AddEditVocabularyComponent implements OnInit {

  currentUser: User;

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    this.currentUser = this.accountService.userValue;

    this.form = this.formBuilder.group({
      word: ['', [Validators.required]],
      mean: ['', [Validators.required]],
      lang: ['', [Validators.required]],
      des: ['', [Validators.required, Validators.maxLength(400), Validators.minLength(5)]]
    });

    if (!this.isAddMode) {
      this.accountService.getVocabularyById(this.id).pipe(first()).subscribe(x => {
        this.f.word.setValue(x.word);
        this.f.mean.setValue(x.mean);
        this.f.des.setValue(x.des);
        this.f.lang.setValue(x.lang);
      });
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    if (this.isAddMode) {
      this.createVocabulary();
    } else {
      this.updateVocabulary();
    }
  }

  private createVocabulary() {
    this.accountService.addVocabularyByUser(this.currentUser.id, this.form.value)
        .pipe(first())
        .subscribe(
            data => {
              this.alertService.success('Added successfully', { keepAfterRouteChange: true });
              this.router.navigate(['.', { relativeTo: this.route }]);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            }
        );
  }

  private updateVocabulary() {
    this.accountService.updateVocabulary(this.id, this.form.value)
        .pipe(first())
        .subscribe(
            data => {
              this.alertService.success('Update successful', { keepAfterRouteChange: true });
              this.router.navigate(['..', { relativeTo: this.route }]);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }
}
