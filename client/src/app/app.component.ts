import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  users: any;

  constructor( private accountService: AccountService) {

  }
  
  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser(): void {
    const userfromLocalStorage = localStorage.getItem('user')
    if ( userfromLocalStorage ){
      const user: User = JSON.parse(userfromLocalStorage);
      this.accountService.setCurrentUser(user);
    }
  }
}
