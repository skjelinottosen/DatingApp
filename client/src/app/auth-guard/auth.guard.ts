import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastrService: ToastrService) {
  }

  canActivate(): Observable<any> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) {
          return of(true);
        }
        this.toastrService.error("No access");
        return of(false);
      }));
  }
}
