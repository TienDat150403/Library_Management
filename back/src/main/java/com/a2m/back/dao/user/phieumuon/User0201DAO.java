package com.a2m.back.dao.user.phieumuon;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.sys.book.*;
import com.a2m.back.model.sys.phieumuon.BorrowedBooksDto;
import com.a2m.back.model.sys.phieumuon.phieumuonDto;
@Mapper
public interface User0201DAO{
	String getAvailableBookByBookCode(String bookCode);
	void addPhieuMuon(phieumuonResponse phieumuon); 
	void addSachMuon(BorrowedBooksDto borrowed);
	int getIdPhieuMuonByUserUid(Long userUid);
	int checkIdPhieuMuonByUserUid(Long userUid);
	int checkPhieuMuonExists(Long userUid);
	int updateSachMuon(String idPhieuMuon, String status);
	String getUserUidByIdPhieuMuon(String idPhieuMuon);
}

