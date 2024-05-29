import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


export const AdminAuthGard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const storedUser = localStorage.getItem('user');
  if (storedUser && JSON.parse(storedUser).isAdmin)
    return true;



  return inject(Router).createUrlTree(['']);



};
