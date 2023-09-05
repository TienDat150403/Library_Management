package com.a2m.back.service.user.impl.phieumuon;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.a2m.back.dao.sys.book.Sys0202DAO;
import com.a2m.back.model.sys.book.GenreBookDto;
import com.a2m.back.service.sys.impl.phieumuon.Sys0301ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.sys.phieumuon.Sys0303DAO;
import com.a2m.back.dao.user.book.User0102DAO;
import com.a2m.back.dao.user.phieumuon.User0201DAO;
import com.a2m.back.dao.user.phieumuon.User0202DAO;
import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.user.book.NotificationDto;
import com.a2m.back.service.sse.SeeNotificationService;
import com.a2m.back.service.sys.impl.phieumuon.Sys0301ServiceImpl;
import com.a2m.back.service.user.book.User0104Service;
import com.a2m.back.service.user.phieumuon.User0202Service;

@Service
public class User0202ServiceImpl implements User0202Service {
    @Autowired
    User0202DAO user0202DAO;

    @Autowired
    Sys0303DAO sys0303DAO;

	@Autowired
	Sys0301ServiceImpl sys0301Service;

    @Autowired
    User0104Service user0104Service;
    @Autowired
    User0201DAO user0201DAO;
    @Autowired
    User0102DAO user0102DAO;
	@Autowired
	Sys0202DAO sys0202DAO;
    @Autowired
    private SeeNotificationService seeNotificationService;
    
    @Override
    public List<phieumuonResponse> getAllPhieuMuon(int status, String userUid) {
        List<phieumuonResponse> listResponse = user0202DAO.getAllPhieuMuon(status, userUid);
        for (int i = 0; i < listResponse.size(); i++) {
            int idPhieuMuon = listResponse.get(i).getIdPhieuMuon();
			int countBook = sys0301Service.getCountBook(idPhieuMuon);
            List<BookResponse> listBook = sys0303DAO.getAllBook(idPhieuMuon);
			for (int j = 0; j < listBook.size(); j++) {
				String bookCode = listBook.get(j).getBookCode();
				List<GenreBookDto> genres = sys0202DAO.getGenreByBookCode(bookCode);
				listBook.get(j).setGenres(genres);
			}
            listResponse.get(i).setListBook(listBook);
			listResponse.get(i).setCountBook(countBook);
		}
        return listResponse;
    }

    @Override
    public List<Integer> getAllIdPhieuMuon(int status, String userUid) {
        return user0202DAO.getAllIdPhieuMuon(status,userUid);
    }

	@Override
	public List<phieumuonResponse> selectByPagination(int status, String userUid, String page) {
		List<phieumuonResponse> listResponse = user0202DAO.selectByPagination(status, userUid, ((Integer.parseInt(page)) - 1) * 5);
		for (int i = 0; i < listResponse.size(); i++) {
			int idPhieuMuon = listResponse.get(i).getIdPhieuMuon();
			int countBook = sys0301Service.getCountBook(idPhieuMuon);
			List<BookResponse> listBook = sys0303DAO.getAllBook(idPhieuMuon);
			listResponse.get(i).setListBook(listBook);
			listResponse.get(i).setCountBook(countBook);
		}
		return listResponse;
	}

	@Override
	public Integer getCountPhieuByUserUidAndStatus(int status, String userUid) {
		return user0202DAO.getCountPhieuByUserUidAndStatus(status,userUid);
	}

	@Override
	public List<String> getBookIDByIDPhieuMuon(String idPhieuMuon) {
		List<String> listBookId = user0202DAO.getBookIDByIDPhieuMuon(idPhieuMuon);
		return listBookId;
	}

	@Override
	public BookResponse getBookByBookID(String bookId) {
		BookResponse listBook = user0202DAO.getBookByBookID(bookId);
		return listBook;
	}

	@Override
	public int changeToCanceled(String idPhieumuon) {
//		phieumuon.setCancelDate(new Date());
		int result = user0202DAO.changeToCanceled(idPhieumuon);
		return result;
	}
	
	public int cancelPhieu(String idPhieuMuon, String userUid) {
		//userUid: là của người hủy, nếu khác userUidOfPhieuMuon tức là
		//phiếu được hủy bởi admin
		List<String> listBookId = getBookIDByIDPhieuMuon(idPhieuMuon);
		List<BookResponse> listBook = new ArrayList<>();
		for(int i = 0; i < listBookId.size(); i++) {
			listBook.add(getBookByBookID(listBookId.get(i)));
		}
		int countBook = sys0301Service.getCountBook(Integer.parseInt(idPhieuMuon));
		user0201DAO.updateSachMuon(idPhieuMuon, "3");
		phieumuonResponse detailPhieuMuon= sys0303DAO.getDetailPhieuMuon(Integer.parseInt(idPhieuMuon));
		detailPhieuMuon.setCountBook(countBook);
		int result = user0202DAO.changeToCanceled(idPhieuMuon);

        String userUidOfPhieuMuon = user0201DAO.getUserUidByIdPhieuMuon(idPhieuMuon + "");

		
		NotificationDto notification = new NotificationDto();
		
		if(result == 1) {
			SimpleDateFormat DateFor = new SimpleDateFormat("dd/MM/yyyy");

			notification.setRead(false);
			notification.setAbout(4);
			notification.setUserUid(userUidOfPhieuMuon);
			notification.setDate_add(new Date());
			if(userUid.equals(userUidOfPhieuMuon)) {
				notification.setContent("Phiếu mượn có mã " + idPhieuMuon + " đã được hủy thành công bởi bạn vào ngày " + DateFor.format(new Date()));
			}
			else {
				notification.setContent("Phiếu mượn có mã " + idPhieuMuon + " đã được hủy bởi ADMIN vào ngày " + DateFor.format(new Date()));
			}
//			notification.setContent("Bạn đã hủy phiếu mượn th");
			notification.setId(idPhieuMuon);
			user0104Service.addNotification(notification);
			seeNotificationService.sendSseNotification(userUidOfPhieuMuon, notification.getContent()) ;

			for(int i = 0; i < listBook.size(); i++) {
				List<String> userUidWishList = user0102DAO.getUserUidByBookCode(listBook.get(i).getBookCode());
				for(int j = 0 ; j < userUidWishList.size(); j++) {
					notification.setRead(false);
					notification.setAbout(0);
					notification.setUserUid(userUidWishList.get(j));
					notification.setDate_add(new Date());
					notification.setContent("Sách bạn đặt hẹn đã có sẵn. Sách " + listBook.get(i).getTitle() + 
							" có mã sách là " + listBook.get(i).getBookCode() + " hiện đã có sẵn. Bạn có thể mượn sách ngay");
					
					
//					notification.setContent("Sach dat co san");
					notification.setId(listBook.get(i).getBookCode());
					user0104Service.addNotification(notification);
					seeNotificationService.sendSseNotification(userUidWishList.get(j), notification.getContent()) ;
				}
			}
		}
		return result;
	}
}
