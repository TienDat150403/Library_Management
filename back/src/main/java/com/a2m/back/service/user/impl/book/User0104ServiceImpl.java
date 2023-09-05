package com.a2m.back.service.user.impl.book;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.sys.book.Sys0201DAO;
import com.a2m.back.dao.sys.phieumuon.Sys0303DAO;
import com.a2m.back.dao.user.book.User0104DAO;
import com.a2m.back.model.resp.NotificationResponse;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.model.user.book.NotificationDto;
import com.a2m.back.service.sys.impl.phieumuon.Sys0303ServiceImpl;
import com.a2m.back.service.user.book.User0104Service;

@Service
public class User0104ServiceImpl implements User0104Service{

	@Autowired
	User0104DAO user0104DAO;
	
	@Autowired 
	Sys0201DAO sys0201DAO;
	
	@Autowired
	Sys0303DAO sys0303DAO;
	
	@Autowired
	Sys0303ServiceImpl sys0303SerivceImpl;

	@Override
	public int addNotification(NotificationDto notification) {
		notification.setDate_add(new Date());
		int result = user0104DAO.addNotification(notification);
		return result;
	}

//	@Override
//	public int deleteNotification(NotificationDto notification) {
//		int result = user0104DAO.deleteNotification(notification);
//		return result;
//	}

	@Override
	public List<NotificationResponse> getNotificationByUserUid(String userUid, int page) {
		List<NotificationResponse> listNoti = user0104DAO.getNotificationByUserUid(userUid, (page - 1) * 5);
		for(NotificationResponse x : listNoti) {
			if(x.getAbout().equals("0")) {
				x.setBook(sys0201DAO.getBookInfo(x.getId()));
			}
			else {
				phieumuonResponse y = sys0303SerivceImpl.getDetailPhieuMuon(Integer.parseInt(x.getId()));
				x.setPhieuMuon(y);
			}
		}
		return listNoti;
	}

	@Override
	public int updateStatusIsReadTrue(List<String> listNotification_id) {
		int result = 0;
		for(int i = 0; i < listNotification_id.size(); i++){
			result = user0104DAO.updateStatusIsReadTrue(listNotification_id.get(i));
		}
		return result;
	}

	@Override
	public int countNoti(String userUid) {
		int result = user0104DAO.countNoti(userUid);
		return result;
	}

	@Override
	public int countNotiUnread(String userUid) {
		int result = user0104DAO.countNotiUnread(userUid);
		return result;
	}

}
