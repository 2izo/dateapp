import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(private root: Router, private toaster: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelStatus = [];
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStatus.push(err.error.errors[key]);
                  }
                }
                throw modelStatus.flat();
              } else {
                this.toaster.error(err.error);
              }
              break;
            case 401:
              this.toaster.error(err.statusText);
              break;
            case 404:
              this.root.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { err: err.error },
              };
              console.log(navigationExtras);
              this.root.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toaster.error('something unexpected');
              console.log(err);
              break;
          }
        }
        return throwError(err);
      })
    );
  }
}
