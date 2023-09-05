package com.a2m.back.controller.sys.phieumuon;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.service.sys.impl.phieumuon.Sys0303ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/admin/sys0303")
public class Sys0303Controller {
    @Autowired
    Sys0303ServiceImpl service;

    @GetMapping("phieumuon/chi-tiet")
    public ResponseEntity<DataResponse> getDetailPhieuMuon(@RequestParam int id){
        DataResponse resp = new DataResponse();
        try {
            phieumuonResponse response = service.getDetailPhieuMuon(id);
            resp.setResponseData(response);
            resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @PostMapping("phieumuon/tien-phat")
    public ResponseEntity<DataResponse> setFinePhieuMuon(@RequestParam int id, @RequestBody List<String> listIdSachTra){
        DataResponse resp = new DataResponse();
        try {
             long fine = service.fine(id, listIdSachTra);
             resp.setStatus(CommonConstants.RESULT_OK);
             resp.setResponseData(fine);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }

    @PutMapping("phieumuon/tra-sach")
    public ResponseEntity<DataResponse> changeStatusToReturnBook(@RequestParam int id, @RequestBody List<String>listIdSachMat){
        DataResponse resp = new DataResponse();
        try {
            service.traSach(id,listIdSachMat);
                resp.setStatus(CommonConstants.RESULT_OK);
        }catch (Exception e){
            System.out.println(e);
        }
        return ResponseEntity.ok(resp);
    }
}
