import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EventEmitter } from 'stream';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new Subject<boolean>();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register(form: NgForm) {
    const value = form.value;
    this.model.username = value.username;
    this.model.password = value.password;

    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );

    this.cancel();
  }

  cancel() {
    this.cancelRegister.next(false);
  }
}
