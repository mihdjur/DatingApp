import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    const that = this;

    this.accountService
      .register(this.model)
      .pipe(
        finalize(() => {
          this.cancel();
        })
      )
      .subscribe({
        next(value) {
          console.log(value);
        },
        error(err) {
          if (typeof err.error == 'string') {
            that.toastr.error(err.error);
          } else {
            that.toastr.error(JSON.stringify(err.error.errors));
          }
        },
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
