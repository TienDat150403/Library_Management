package com.a2m.back.dao.user.phieumuon;


import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.sys.phieumuon.phieumuonDto;

@Mapper
public interface User0202DAO {
    List<String> getBookIDByIDPhieuMuon(String idPhieuMuon);
    BookResponse getBookByBookID(String bookId);
    int changeToCanceled(String idPhieuMuon);
    List<phieumuonResponse> getAllPhieuMuon(int status, String userUid);
    List<Integer> getAllIdPhieuMuon(int status, String userUid);
    List<phieumuonResponse> selectByPagination(int status,  String userUid,int ignore);
    Integer getCountPhieuByUserUidAndStatus(int status, String userUid);
}
