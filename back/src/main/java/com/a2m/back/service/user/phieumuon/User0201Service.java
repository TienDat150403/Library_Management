package com.a2m.back.service.user.phieumuon;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.sys.book.Book;
import com.a2m.back.model.sys.phieumuon.phieumuonDto;

public interface User0201Service{
	void addPhieuMuon(phieumuonResponse phieumuon) throws Exception;
	String getAvailableBookByBookCode(String bookCode);
	public List<Book> getBooksByBookCode(String bookCode);
	public int checkPhieuMuonExists(Long userUid);
//	int updateSachMuon(String idPhieuMuon, String status);

}
