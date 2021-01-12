import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {UserDTO} from "../../shared/dto/userDTO";
import {NotificationService} from "../../shared/services/notification.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  isLoading = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      zipCode: ['', [Validators.pattern('[0-9 ]*')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPass: ['', Validators.required]
    }, {validators: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    if (this.form.invalid || this.isLoading || this.isSubmitted) return;

    this.isSubmitted = true;
    this.isLoading = true;

    const userDTO = this.getUserInformation();

    this.userService.signUp(userDTO).subscribe(savedUser => {
      if (savedUser) {
        this.notificationService.showSuccess('User was successfully saved!');
        this.onClear();
      }
    },
      err => {
        this.notificationService.showError('The same email is already in the database!');
        this.isLoading = false;
        this.isSubmitted = false;
      }
    );
  }

  getUserInformation(): UserDTO {
    return {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      address: this.form.value.address,
      zipCode: this.form.value.zipCode,
      password: this.form.value.password
    };
  }

  onClear() {
    this.form.reset();
    this.isSubmitted = false;
    this.isLoading = false;
  }

  get f() {
    return this.form.controls;
  }


}
