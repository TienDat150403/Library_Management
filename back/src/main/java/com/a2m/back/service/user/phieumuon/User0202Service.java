package com.a2m.back.service.user.phieumuon;

import com.a2m.back.model.resp.BookResponse;

import com.a2m.back.model.sys.phieumuon.phieumuonDto;

import com.a2m.back.model.resp.phieumuonResponse;

import org.springframework.stereotype.Service;

import java.util.List;

public interface User0202Service {

    List<String> getBookIDByIDPhieuMuon(String idPhieuMuon);
    BookResponse getBookByBookID(String bookId);
    int changeToCanceled(String idPhieuMuon);
    List<phieumuonResponse> getAllPhieuMuon(int status, String userUid);
    List<Integer> getAllIdPhieuMuon(int status, String userUid);
    List<phieumuonResponse> selectByPagination(int STATUS,  String userUid,String ignore);
    Integer getCountPhieuByUserUidAndStatus(int status, String userUid);
}
