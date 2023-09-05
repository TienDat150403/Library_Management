package com.a2m.back.dao.user.phieumuon;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.sys.phieumuon.phieumuonDto;

@Mapper
public interface User0203DAO {
	phieumuonResponse getPhieuMuonInfo(int idPhieuMuon);
	void extendReturnDate(phieumuonResponse phieumuon);
}
