import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginForm} from "../../shared/models/loginForm";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {Role} from "../../shared/enums/Role";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  public loginForm: LoginForm;

  registerForm: FormGroup;
  submitted = false;

  errorMessage: string = '';

  showPassword: boolean = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false]
    });
    this.registerForm.valueChanges.subscribe(() => this.errorMessage = '');
    this.initWrongCredentialsListener();
  }

  initWrongCredentialsListener() {
    this.userService.getErrorWrongCredentials().subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
  }

  changePasswordStatus() {
    this.showPassword = !this.showPassword;
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    console.log('submit');
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.saveDataToLoginForm();
      console.log('saving data, log in');
      this.userService.login(this.loginForm).subscribe( data => {
        if (data) {
          this.passBackData();
        }
      });
      // TODO you have to wait for an error and only than go further to passBackData()
    }
  }

  passBackData() {
    this.activeModal.close(this.loginForm);
  }

  saveDataToLoginForm() {
    this.loginForm = {
      username: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      isRemembered: this.registerForm.controls.rememberMe.value
    }
  }

  redirectToRegistration() {
    this.activeModal.close();
    this.router.navigate(['user/sign-up']);
  }



}
