import { UserInfo } from "app/_model/auth/user-info";
import { DauSach } from "../book.model";

export class phieumuonDto {
    idPhieuMuon?: number;
    userUid?: number;
    fine: number;
    createdDate?: Date;
    borrowDate?: Date;
    returnDateEstimate?: Date;
    returnUpdateReal?: Date;
    status?: number;
    extended_times?: number;
    listBook?: DauSach[];
    userInfo?: UserInfo;
    countBook?: number;
    checked?: boolean;
    cancelDate?: Date;
    img?: String;
    borrowDateReal?: Date;
}
