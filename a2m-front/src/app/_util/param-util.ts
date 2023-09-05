import { RequestParam } from "./request-param";

export class ParamUtil {
    public static toRequestParams<T>(obj: any) {
        const params: RequestParam[] = [];
        if (obj != null && obj != undefined) {
            Object.keys(obj).forEach((k: any) => {
                if (obj[k] != null && obj[k] != undefined) {
                    params.push(new RequestParam(k, obj[k]));
                }
            });
        }
        return params;
    }
    //   {name: "A", address: "HN"}
    //   [{name: "name", value: "A"}, {name: "address", value: "HN"}]
}
