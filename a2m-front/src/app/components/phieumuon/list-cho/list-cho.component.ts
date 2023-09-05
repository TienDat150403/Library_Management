import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstant } from 'app/_constant/common.constants';
import { UserInfo } from 'app/_model/auth/user-info';
import { DataResponse } from 'app/_model/resp/data-response';
import { phieumuonDto } from 'app/_model/sys/book/phieumuon/phieumuonDto.model';
import { Sys0301Service } from 'app/_service/sys/phieumuon/sys0301.service';
import { User0202Service } from 'app/_service/user/phieumuon/user0202.service';
import { SearchService } from 'app/_service/user/serach.service';
import { User0104Service } from 'app/_service/user/user0104.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
declare var window: any;

@Component({
  selector: 'app-list-cho',
  templateUrl: './list-cho.component.html',
  styleUrls: ['../phieumuon.component.css']
})
export class ListChoComponent implements OnInit {
  list: phieumuonDto[];
  status: number = 0;
  reverse: boolean = false;
  selectedItem: any;
  formModalOk: any;
  ModalConfirmAll: any;
  idPhieuMuon: number = 0;
  numbersArray: Number[] = [];
  pageCurrent: number = 1;
  selectAllChecked = false;
  isAnyCheckboxChecked: boolean = false;
  username: string;
  phieuMuonToCancel: phieumuonDto
  listChecked: any[] = []
  totalPhieuMuon: any;
  selectedStatus: number = 0;
  statusOfPhieuMuon: number = 0;

  constructor(private sys0301service: Sys0301Service,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private user0202Service: User0202Service,
    private user0104Service: User0104Service,
    private searchService: SearchService,
    private router: Router) { }

  ngOnInit(): void {

    this.searchService.raiseStatutEmitterEvent(0);

    this.formModalOk = new window.bootstrap.Modal(
      document.getElementById('itemModal')
    )

    this.ModalConfirmAll = new window.bootstrap.Modal(
      document.getElementById('modalConfirmAll')
    )

    this.totalPhieu()
    this.getData()
    this.pagination()
  }

  toggleSelectAll(item: any) {
    this.selectedItem = item;
    this.selectAllChecked = this.selectAllChecked;
    // Đặt trạng thái của checkbox cho từng mục trong danh sách
    this.list.forEach(item => item.checked = this.selectAllChecked);
    this.isAnyCheckboxChecked = this.list.some(item => item.checked);
    this.selectedItem = this.list.find(item => item.checked)
    console.log('selected ' + this.selectedItem);
    console.log('isChekced' + this.isAnyCheckboxChecked);
  }

  chekcedItem(item: any) {
    this.selectedItem = item;
    this.selectedItem = this.list.find(item => item.checked)
    if (this.selectedItem == undefined) {
      this.isAnyCheckboxChecked = !this.list.some(item => item.checked);
    }
    console.log('selected ' + this.selectedItem);
    console.log('isChekced' + this.isAnyCheckboxChecked);
  }

  confirmAll() {
    const selectedItems = this.list.filter(item => item.checked);
    if (selectedItems.length > 0) {
      // Thực hiện hàm updateStatus cho từng mục đã được chọn
      selectedItems.forEach(item => {
        const id = item.idPhieuMuon ?? 0; // Sử dụng giá trị mặc định 0 nếu idPhieuMuon là undefined
        this.updateStatus(id);
      });
    } else {
      this.toastr.error("Vui lòng chọn ít nhất 1 phiếu!")
    }
  }
  openModal(item: any) {
    this.selectedItem = item;
    this.formModalOk.show();
  }

  openModalConfirmAll() {
    this.ModalConfirmAll.show();
  }

  sortByCreatedDate() {
    if (this.reverse) {
      this.list.sort((a, b) => {
        const dateA = a.borrowDate ? new Date(a.borrowDate) : null;
        const dateB = b.borrowDate ? new Date(b.borrowDate) : null;
        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        }
        return 0;
      });
    }
    else {
      this.list.sort((a, b) => {
        const dateA = a.borrowDate ? new Date(a.borrowDate) : null;
        const dateB = b.borrowDate ? new Date(b.borrowDate) : null;
        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime()
        }
        return 0;
      });
    }

    this.reverse = !this.reverse;

  }

  updateStatus(idPhieuMuon: number) {
    this.idPhieuMuon = idPhieuMuon;
    this.sys0301service.updateStatus(idPhieuMuon).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Xác nhận phiếu mượn thành công!',
          }).then(
            () => {
              this.router.navigate(['/sys/list-phieumuon/status/1']);
            });
        } else {
          this.toastr.success("Xác nhận phiếu mượn thất bại")
          window.location.reload();
        }
      }
    })
  }

  getData() {
    this.sys0301service.getListPhieuMuonLimit(this.status, this.pageCurrent, this.selectedStatus).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          if (resp && resp.listResponseData && Array.isArray(resp.listResponseData)) {
            this.list = []
            this.list = resp.listResponseData.map((item: any) => {
              const phieumuonItem: phieumuonDto = {
                idPhieuMuon: item.idPhieuMuon,
                userUid: item.userUid,
                createdDate: item.createdDate,
                borrowDate: item.borrowDate,
                returnDateEstimate: item.returnDateEstimate,
                returnUpdateReal: item.returnUpdateReal,
                status: item.status,
                extended_times: item.extended_times,
                countBook: item.countBook,
                userInfo: item.userInfo as UserInfo,
                fine: item.fine
              };
              return phieumuonItem;
            });
          }
          console.log(this.list);

        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getDataByUsername() {
    console.log(this.username);
    this.sys0301service.getPhieuByUsername(this.status, this.username).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          if (resp && resp.listResponseData && Array.isArray(resp.listResponseData)) {
            this.list = resp.listResponseData.map((item: any) => {
              const phieumuonItem: phieumuonDto = {
                idPhieuMuon: item.idPhieuMuon,
                userUid: item.userUid,
                createdDate: item.createdDate,
                borrowDate: item.borrowDate,
                returnDateEstimate: item.returnDateEstimate,
                returnUpdateReal: item.returnUpdateReal, status: item.status,
                extended_times: item.extended_times,
                countBook: item.countBook,
                userInfo: item.userInfo as UserInfo,
                fine: item.fine,
                borrowDateReal: item.borrowDateReal
              };
              return phieumuonItem;
            });
          }
          console.log(this.list);

        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  totalPhieu() {
    this.sys0301service.getTotalPhieuByStatus(this.status).subscribe({
      next: (resp: DataResponse) => {
        if (resp.status == CommonConstant.RESULT_OK) {
          this.totalPhieuMuon = resp.responseData;
          this.generateNumbersArray();
        }
      }
    })
  }
  generateNumbersArray() {
    const totalPages = Math.ceil(this.totalPhieuMuon / 5);
    this.numbersArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  currentPage(page: Number) {
    if (page != 0) {
      this.router.navigate(['/sys/list-phieumuon/status/' + this.status], { queryParams: { page: page } })
    }
  }

  appendQueryParam(page: number) {
    let nextPage = this.pageCurrent + page;
    if (nextPage > 0) {
      this.router.navigate(['/sys/list-phieumuon/status/' + this.status], { queryParams: { page: nextPage } })
    }
    console.log(nextPage);
  }

  pagination() {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.pageCurrent = Number(param.get("page"))
      console.log("navigate")
      if (this.pageCurrent == 0) {
        this.pageCurrent = 1
      }
      this.list = []
      this.getData();
    })
  }

  cancelPhieuMuon() {
    this.user0202Service.cancelPhieuDanhChoXacNhan(this.phieuMuonToCancel.idPhieuMuon + '').subscribe({
      next: (resp: DataResponse) => {
        if (resp.status === CommonConstant.RESULT_OK) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Xác nhận phiếu mượn thành công!',
          }).then(
            () => {
              this.router.navigate(['/sys/list-phieumuon/status/0'], { queryParams: { page: 1, statusBorrowDate: this.selectedStatus } })
            });
          this.list = []
          this.getData()
          this.user0104Service.countTotalNotiUnread().subscribe(data => {
          })
        }
      },
      error: (err: any) => {
      }
    })
  }

  phieuMuonSelected(item: phieumuonDto) {
    this.phieuMuonToCancel = item;
  }

  onChangeSelectedStatus() {
    this.list = []
    this.router.navigate(['/sys/list-phieumuon/status/0'], { queryParams: { page: 1, statusBorrowDate: this.selectedStatus } })
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Thành công',
    //   text: 'Xác nhận phiếu mượn thành công!',
    // }).then(
    //   () => {
    //   });
  }
}