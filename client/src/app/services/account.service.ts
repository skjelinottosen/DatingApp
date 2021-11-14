import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'

import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  pipe(arg0: any): import("rxjs").Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  private baseUrl ='https://localhost:5001/api/'
  userKey = 'user';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(model: any) {
    return this.httpClient.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any) {
    return this.httpClient.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.currentUserSource.next();
  }
}
