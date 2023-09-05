package com.a2m.back.service.sys.impl.phieumuon;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.a2m.back.dao.sys.book.Sys0202DAO;
import com.a2m.back.model.sys.book.GenreBookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.sys.phieumuon.Sys0303DAO;
import com.a2m.back.dao.user.book.User0102DAO;
import com.a2m.back.dao.user.book.User0104DAO;
import com.a2m.back.dao.user.phieumuon.User0201DAO;
import com.a2m.back.dao.user.phieumuon.User0202DAO;
import com.a2m.back.model.resp.BookResponse;
import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.sys.book.BookTitle;
import com.a2m.back.model.user.book.NotificationDto;
import com.a2m.back.service.sse.SeeNotificationService;
import com.a2m.back.service.sys.Sys0101Service;
import com.a2m.back.service.sys.book.Sys0201Service;
import com.a2m.back.service.sys.book.Sys0203Service;
import com.a2m.back.service.sys.phieumuon.Sys0303Service;
import com.a2m.back.service.user.book.User0104Service;
import com.a2m.back.service.user.phieumuon.User0202Service;
@Service
public class Sys0303ServiceImpl implements Sys0303Service {
    @Autowired
    Sys0303DAO sys0303DAO;

    @Autowired
    Sys0201Service sys0201Service;
    @Autowired
    Sys0101Service sys0101Service;
    @Autowired
    Sys0202DAO sys0202DAO;
    @Autowired
    User0202DAO user0202DAO;

    @Autowired
    User0104DAO user0104DAO;

    @Autowired
    User0102DAO user0102DAO;

    @Autowired
    User0201DAO user0201DAO;

    @Autowired
    private SeeNotificationService seeNotificationService;

    Long fine = Long.valueOf(0);

    @Override
    public List<BookResponse> getAllBook(int idPhieuMuon) {
        List<BookResponse> listResponse = sys0303DAO.getAllBook(idPhieuMuon);
//        for (int i = 0; i < listResponse.size(); i++) {
//            String bookCode = listResponse.get(i).getBookCode();
//            List<GenreBookDto> genres = sys0202DAO.getGenreByBookCode(bookCode);
//            listResponse.get(i).setGenres(genres);
//        }
        return listResponse;
    }

    @Override
    public phieumuonResponse getDetailPhieuMuon(int idPhieuMuon) {
        phieumuonResponse objResponse = sys0303DAO.getDetailPhieuMuon(idPhieuMuon);
        List<BookResponse> listBook = getAllBook(idPhieuMuon);
        UserResponse userResponse = sys0101Service.getUserInfoByUserUid(String.valueOf(objResponse.getUserUid()));
        objResponse.setListBook(listBook);
        objResponse.setUserInfo(userResponse);
        return objResponse;
    }

    public void traSach (int idPhieuMuon, List<String> listSachMat){
        changeStatusToReturnBook(idPhieuMuon);
        if(listSachMat.size()>0){
            for (int i = 0; i < listSachMat.size(); i++) {
                changeToDisable(listSachMat.get(i));
            }
        }
        
        NotificationDto notification = new NotificationDto();
        
        String userUid = user0201DAO.getUserUidByIdPhieuMuon(idPhieuMuon + "");
		SimpleDateFormat DateFor = new SimpleDateFormat("dd/MM/yyyy");

        notification.setRead(false);
		notification.setAbout(3);
		notification.setUserUid(userUid);
		notification.setDate_add(new Date());
		notification.setContent("Phiếu mượn " + idPhieuMuon + " đã được trả thành công vào ngày " + DateFor.format(new Date()));

		notification.setId(idPhieuMuon + "");
		
		user0104DAO.addNotification(notification);
		
		List<String> listBookId = user0202DAO.getBookIDByIDPhieuMuon(idPhieuMuon + "");
		List<BookResponse> listBook = new ArrayList<>();
		for(int i = 0; i < listBookId.size(); i++) {
			if(!listSachMat.contains(listBookId.get(i))) {
				listBook.add(user0202DAO.getBookByBookID(listBookId.get(i)));
			}
		}
		
		for(int i = 0; i < listBook.size(); i++) {
			List<String> userUidWishList = user0102DAO.getUserUidByBookCode(listBook.get(i).getBookCode());
			for(int j = 0 ; j < userUidWishList.size(); j++) {
				notification.setRead(false);
				notification.setAbout(0);
				notification.setUserUid(userUidWishList.get(j));
				notification.setDate_add(new Date());
				
//				notification.setContent("Sách bạn đặt hẹn đã có sẵn. Sách " + listBook.get(i).getTitle() + 
//						" có mã sách là" + listBook.get(i).getBookCode() + " hiện đã có sẵn. Bạn có thể mượn sách ngay");
//				
				
				notification.setContent("Sách " + listBook.get(i).getTitle() + 
						" có mã sách là " + listBook.get(i).getBookCode() + " hiện đã có sẵn. Bạn có thể mượn sách ngay");
				

				notification.setId(listBook.get(i).getBookCode());
				user0104DAO.addNotification(notification);
				seeNotificationService.sendSseNotification(userUidWishList.get(j), notification.getContent());
			}

		}
    }

    public Long fine(int idPhieuMuon, List<String> listSachTra) {
        phieumuonResponse phieumuonResponse = getDetailPhieuMuon(idPhieuMuon);
        Date dateEstimate = phieumuonResponse.getReturnDateEstimate();
        LocalDate localDateEstimate = dateEstimate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate today = LocalDate.now();
        long daysDifference = ChronoUnit.DAYS.between(localDateEstimate, today);

        if (daysDifference > 0) {
            fine = daysDifference * listSachTra.size() * 1;
        } else {
            fine = Long.valueOf(0);
        }

        List<String> listSachMat = new ArrayList<>();
        List<String> listIdSach = getListBookIdByIdPhieuMuon(idPhieuMuon);

        if (listIdSach.size() == listSachTra.size()) {
            listSachMat.clear();
        } else {
            for (int i = 0; i < listIdSach.size(); i++) {
                if (!listSachTra.contains(listIdSach.get(i))) {
                    listSachMat.add(listIdSach.get(i));
                }
            }
        }

        if (listSachMat.size() > 0) {
            for (int i = 0; i < listSachMat.size(); i++) {
                String bookcode = listSachMat.get(i).substring(0, 4);
                BookTitle bookLose = sys0201Service.getBookInfo(bookcode);
                if (bookLose.getCategory() == 0) {
                    fine += bookLose.getPrice();
                } else if (bookLose.getCategory() == 1) {
                    fine += bookLose.getPrice() * 5;
                }
            }
        }
        return fine;
    }

    @Override
    public void changeStatusToReturnBook(int idPhieuMuon) {
        sys0303DAO.changeStatusToReturnBook(idPhieuMuon, fine);
    }

    @Override
    public List<String> getListBookIdByIdPhieuMuon(int idPhieuMuon) {
        return sys0303DAO.getListBookIdByIdPhieuMuon(idPhieuMuon);
    }

    @Override
    public void changeToDisable(String book_id) {
        sys0303DAO.changeToDisable(book_id);
    }
}
