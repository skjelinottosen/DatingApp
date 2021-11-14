import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  loggedIn = false;

  constructor(public accountService: AccountService, private router: Router, private toastrService: ToastrService) {}

  ngOnInit(): void {
  }

  login(): void {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/members')
      },
      (error) => {
        this.toastrService.error(error.error);
      }
    );
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
