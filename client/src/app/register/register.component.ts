import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService, private toastrService: ToastrService) {}

  ngOnInit(): void {
  }

  onRegister(): void {
    this.accountService.register(this.model).subscribe((user) => {
      console.log(user);
      this.onCancel();
    }, (error) => {
      this.toastrService.error(error.error);
    });
  }

  onCancel(): void {
    this.cancelRegister.emit(false);
  }
}
