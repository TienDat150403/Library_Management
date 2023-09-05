export class DataResponse {
    status: string;
    message: string;
    listResponseData: Object[];
    responseData: Object;
    constructor(status: string, message: string, responseData: Object, listResponseData: Object[]) {
        this.status = status;
        this.message = message;
        this.responseData = responseData;
        this.listResponseData = listResponseData;
    }
}
