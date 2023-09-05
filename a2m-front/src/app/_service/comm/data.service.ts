import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userUid: any;
  private idPhieuMuon: number;
  private selectedRole: boolean = false;
  private navigateToGenre: boolean = false;
  private statusOfPhieuMuon: number = 0;


  setuserUid(data: any) {
    this.userUid = data;
  }

  setSelectedRole(data: any) {
    this.selectedRole = data;
  }

  setidPhieuMuon(idPhieuMuon: number) {
    this.idPhieuMuon = idPhieuMuon;
  }

  setNavigateToGenre(value: boolean) {
    this.navigateToGenre = value;
  }

  getUserUid() {
    return this.userUid;
  }

  getSelectedRole() {
    return this.selectedRole;
  }

  getIdPhieuMuon() {
    return this.idPhieuMuon;
  }
  getNavigateToGenre() {
    return this.navigateToGenre;
  }

  setStatusOfPhieuMuon(value: number) {
    this.statusOfPhieuMuon = value;
  }

  getStatusOfPhieuMuon() {
    return this.statusOfPhieuMuon;
  }


}
