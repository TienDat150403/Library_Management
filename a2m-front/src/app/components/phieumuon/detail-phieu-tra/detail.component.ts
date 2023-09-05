import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { DauSach } from 'app/_model/sys/book/book.model';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { Book } from 'app/_model/user/book.model';
import { DauSachService } from 'app/_service/services/dausach.service';
import { Sys0303Service } from 'app/_service/sys/phieumuon/sys0303.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  idPhieuMuon: number = 0;
  phieumuonDto: phieumuonDto;
  listBook: DauSach[] = [];
  listImg: string[] = [];
  userInfo: UserInfo;
  selectedBookIds: string[] = [];
  remainingBookIds: string[] = [];
  constructor(private route: ActivatedRoute,
    private sys0303Service: Sys0303Service,
    private dauSach: DauSachService,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPhieuMuon = params.get('id')
      if (idPhieuMuon !== null) {
        this.idPhieuMuon = Number(idPhieuMuon);
      }
    })
    this.getDetailData();
  }

  getDetailData() {
    this.sys0303Service.getDetailPhieuMuon(this.idPhieuMuon).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.phieumuonDto = resp.responseData as phieumuonDto;
          this.listBook = this.phieumuonDto?.listBook ?? [];
          let subscribeList: any[] = [];
          for (let i = 0; i < this.listBook.length; i++) {
            if (this.listBook[i].img) {
              subscribeList.push(this.dauSach.getCover(this.listBook[i].img!));
            }
            else {
              subscribeList.push(this.dauSach.getCover("no-image.png"));
            }
          }
          forkJoin(subscribeList).pipe(
            map((respArr) => {
              // console.log(respArr);
              for (let item of respArr) {
                this.listImg.push('data:image/jpeg;base64,' + item.responseData);
              }
              // console.log(this.imageArray)
            })
          ).subscribe();
          this.userInfo = this.phieumuonDto?.userInfo as UserInfo;
          console.log(this.userInfo);
        }
      }
    })
  }

  toggleBookSelection(bookId: string | undefined) {
    if (bookId !== undefined) {
      const index = this.selectedBookIds.indexOf(bookId);
      console.log(index);
      console.log(bookId);
      if (index > -1) {
        this.selectedBookIds.splice(index, 1); // Xóa ID sách nếu đã tồn tại trong mảng
      } else {
        this.selectedBookIds.push(bookId); // Thêm ID sách nếu chưa tồn tại trong mảng
      }
      this.remainingBookIds = (this.listBook ?? [])
        .filter(book => book.book_id !== undefined) // Loại bỏ các phần tử có giá trị undefined
        .map(book => book.book_id as string); // Ép kiểu id về string
      this.remainingBookIds = this.remainingBookIds.filter(id => !this.selectedBookIds.includes(id)); // Lọc các phần tử chưa được chọn
      console.log(this.selectedBookIds)
    }
  }

  createaBill() {
    if (this.selectedBookIds.length == 0) {
      for (let c of this.listBook) {
        if (c.book_id) {
          this.remainingBookIds.push(c.book_id)
        }
      }
    }
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      text: 'Tạo hóa đơn thành công!',
    }).then(
      () => {
        this.router.navigate(['/sys/list-phieumuon/tra-sach/', this.idPhieuMuon], { queryParams: { selectedIds: this.selectedBookIds.join(','), remainingIds: this.remainingBookIds.join(',') } });
      });
  }
}
