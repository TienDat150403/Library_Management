import { Sys0101Service } from 'app/_service/sys/sys0101.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'app/_model/auth/user-info';
import { AuthenticationService } from 'app/_service/auth/authentication.service';
import { DataResponse } from 'app/_model/resp/data-response';
import { CommonConstant } from 'app/_constant/common.constants';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { DataService } from 'app/_service/comm/data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-detail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: string = ''
  user: UserInfo
  soPhieu: any;
  messErr: string = '';
  previewImage: any;
  file: File;

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private sys0101Service: Sys0101Service,
    private sys0301Service: Sys0301Service,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = '' + this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    this.dataService.setuserUid(this.id);
    this.getListUserByUserUid()
    this.countPhieuMuonByUserUid()

  }

  getListUserByUserUid() {
    this.sys0101Service.getUserByUserUid(this.id).subscribe({
      next: (resp: UserInfo) => {
        this.user = resp;
        console.log(this.user)
        if (this.user.imgPath !== "") {
          this.authService.getUserCover(this.user.imgPath!).subscribe(
            (response) => {
              this.previewImage = 'data:image/jpeg;base64,' + response.responseData;
            }
          );
        }
        else {
          this.authService.getUserCover("no-image.png").subscribe(
            (response) => {
              this.previewImage = 'data:image/jpeg;base64,' + response.responseData;
            }
          );
        }
      },
      error: (err: any) => {
      }
    })
  }

  countPhieuMuonByUserUid() {
    this.sys0301Service.countPhieuMuonOfUser(this.id).subscribe({
      next: (resp: DataResponse) => {
        this.soPhieu = resp.responseData;
        console.log(resp.responseData)
      },
      error: (err: any) => {
      }
    })
  }

  disableUser() {
    this.authService.disableUser(this.id).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Xóa tài khoản thành công!',
          }).then(
            () => {
              this.router.navigate(['/sys/user-list/status/02-04']);
            });
        } else {
          this.messErr = resp.message;
          this.toastr.error(this.messErr);
        }
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

}
