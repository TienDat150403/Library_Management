import { Cookie } from "ng2-cookies";
import { HttpHeaders } from "@angular/common/http";
import { AuthConstant } from "../_constant/auth.constant";

export class HeadersUtil {
    public static getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }

    public static getHeadersAuth(): HttpHeaders {
        const token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);
        if (token == undefined || token == null) {
            return HeadersUtil.getHeaders();
        }

        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: AuthConstant.TOKEN_TYPE_KEY + token,
        });
    }

    public static getHeadersAuthCover(): HttpHeaders {
        const token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);
        if (token == undefined || token == null) {
            return HeadersUtil.getHeaders();
        }

        return new HttpHeaders({
            Authorization: AuthConstant.TOKEN_TYPE_KEY + token,
        });
    }
}
