import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-customer-details-form',
  templateUrl: './customer-details-form.component.html',
  styleUrls: ['./customer-details-form.component.css']
})
export class CustomerDetailsFormComponent implements OnInit {

  FormGroup: FormGroup;
  submitted = false;
  //@Output() customerDetails = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('[0-9 ]*')]]
    });
  }

  onSubmit() {
    console.log('customer details submitting');
  }

  get f() {
    return this.FormGroup.controls;
  }

}
