import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-userregistration',
  template: `
 <div class="card">
 <div class="card-header">
 Sign up!
 </div>
 <div class="card-body">
 <form [formGroup]="formGroup" (ngSubmit)="save()">
 <label class="col-md-2 col-form-label">
 First name:
 </label>
 <div class="col-md-8">
 <input class="form-control" type="text" formControlName="firstName">
 </div>
 <label class="col-md-2 col-form-label">Last name:</label>
 <div class="col-md-8">
 <input class="form-control" type="text" formControlName="lastName">
 </div>
 <label class="col-md-2 col-form-label">Email</label>
 <div class="col-md-8">
 <input class="form-control" type="email" formControlName="email">
 </div>
 <div class="form-group row mb-2">
 <div class="offset-md-2 col-md-4">
 <button class="btn btn-primary mr-3"
 type="submit"
style="width:80px">Save
 </button>
 </div>
 </div>
 </form>
 </div>
</div>
 `,
})
export class UserregistrationComponent implements OnInit {
  formGroup: FormGroup;
  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
  }
  save() {
    console.log(this.formGroup.value);
  }
}
