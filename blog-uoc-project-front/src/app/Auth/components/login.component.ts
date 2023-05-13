import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../actions';
import { AuthDTO } from '../models/auth.dto';
import { ErrorHandler } from 'src/app/error.handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private errorHandler: ErrorHandler
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    this.errorHandler.handleErrors(this.loginForm, this.errors);
  }

  login(): void {
    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      user_id: '',
      access_token: '',
    };

    this.store.dispatch(AuthAction.login({ credentials }));
  }

  getErrorMessage(controlName: string): string {
    if (controlName === 'email') {
      if (this.email.hasError.length > 0) {
        return 'You must enter a valid email';
      }
    }
    if (controlName === 'password') {
      if (this.password.hasError('required')) {
        return 'You must enter a password';
      }
      if (
        this.password.hasError('minLength') ||
        this.password.hasError('maxLength')
      ) {
        return 'Password must be between 8 and 16 characters long';
      }
    }
    return '';
  }
}