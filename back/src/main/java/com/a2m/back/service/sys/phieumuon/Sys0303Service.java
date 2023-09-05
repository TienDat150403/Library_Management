package com.a2m.back.service.sys.phieumuon;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.phieumuonResponse;

import java.util.List;

public interface Sys0303Service {
    List<BookResponse> getAllBook(int idPhieuMuon);
    phieumuonResponse getDetailPhieuMuon(int idPhieuMuon);
    void changeStatusToReturnBook (int idPhieuMuon);
    List<String> getListBookIdByIdPhieuMuon(int idPhieuMuon);
    void changeToDisable(String book_id);

}
