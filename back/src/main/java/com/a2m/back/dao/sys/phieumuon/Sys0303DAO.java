package com.a2m.back.dao.sys.phieumuon;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Sys0303DAO {
    List<BookResponse> getAllBook(int idPhieuMuon);
    phieumuonResponse getDetailPhieuMuon(int idPhieuMuon);
    void changeStatusToReturnBook (int idPhieuMuon, long fine);
    List<String> getListBookIdByIdPhieuMuon(int idPhieuMuon);
    void changeToDisable(String book_id);

}
