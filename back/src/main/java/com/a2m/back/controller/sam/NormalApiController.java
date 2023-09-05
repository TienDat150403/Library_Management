package com.a2m.back.controller.sam;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.service.comm.CommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Author tiennd
 * Created date 2023-07-16
 */

@RestController
@RequestMapping("api/normal")
public class NormalApiController {

    @Autowired
    private CommonService commonService;

    @GetMapping("getUserUid")
    public ResponseEntity<DataResponse> getUserUid() {
        DataResponse resp = new DataResponse();
        try {
            String userUid = commonService.getUserUid();
            resp.setStatus(CommonConstants.RESULT_OK);
            resp.setResponseData(userUid);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
}
