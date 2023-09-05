package com.a2m.back.service.sys.phieumuon;

import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.sys.phieumuon.phieumuonDto;

import java.util.List;

public interface Sys0301Service {
    List<phieumuonResponse> getAllPhieuMuon(int STATUS);
    List<phieumuonResponse> getPhieuMuonInfo(String USER_UID, int STATUS);
    phieumuonResponse getDetailPhieuMuon(String USER_UID, int STATUS);
    void changeStatus(int STATUS, int idPhieuMuon);
    List<String> getAllUserUid(int STATUS);
    Integer getCountBook (int idPhieuMuon);
    int getQuantityPhieuOfUser(String userUid);
    List<phieumuonResponse> selectByPagination(int STATUS, String page, int statusBorrowDate);
    List<phieumuonResponse> selectPhieuMuonByUsername(int status, String username);
    Integer getCountPhieuByStatus(int status);

    Integer getCountPhieuByStatusAndUserUid(int status, String userUid);
}

