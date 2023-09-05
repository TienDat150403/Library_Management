import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../_service/auth/authentication.service';
import { CommonConstant } from '../_constant/common.constants';
import { Role } from '../_model/auth/role';
import { DataResponse } from '../_model/resp/data-response';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isPermission: boolean = false;
    const roles = route.data['guards'];
    await lastValueFrom(this.authService.getRoles()).then((resp: DataResponse) => {
      if (CommonConstant.RESULT_OK == resp.status) {
        let temp: any = resp.responseData;
        let roleStr: string[] = [...temp].map((role: Role) => role.roleId);
        isPermission = roleStr.some((role: string) => roles.includes(role))
      }
    }).catch((err: any) => {

    })
    if (!isPermission) {
      this.router.navigate(["/error/403"])
    }
    return isPermission;
  }

}
