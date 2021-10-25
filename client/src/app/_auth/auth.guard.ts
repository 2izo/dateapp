import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountServiceService } from '../_services/account-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountservice: AccountServiceService,
    private toastr: ToastrService
  ) {}
  canActivate(): Observable<boolean> {
    return this.accountservice.currentUser$.pipe(
      map((e) => {
        if (e) return true;
        this.toastr.error('You shall not pass');
        return false;
      })
    );
  }
}
