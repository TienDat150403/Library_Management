import { Role } from "./role";

export class UserInfo {
    userUid?: string;
    userId?: string;
    createdBy?: string;
    createdDate?: Date;
    email?: string;
    cellPhone?: string;
    dob?: Date;
    soPhieuDaTao?: number;
    fullName?: string;
    address?: string;
    gender?: boolean;
    imgPath?: string;
    twoFAEnable?: boolean;
    authProvider?: string;
    organization?: string;
    position?: string;
    roles?: Role[];
    status?: String;
}
