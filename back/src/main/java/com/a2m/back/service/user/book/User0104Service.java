package com.a2m.back.service.user.book;

import java.util.List;

import com.a2m.back.model.resp.NotificationResponse;
import com.a2m.back.model.user.book.NotificationDto;

public interface User0104Service {

    int addNotification(NotificationDto notification);
	
    int countNoti(String userUid);
    
    int countNotiUnread(String userUid);
//	int deleteNotification(NotificationDto notification);
	
	List<NotificationResponse> getNotificationByUserUid(String userUid, int page);
	
	int updateStatusIsReadTrue(List<String> listNotification_id);

}
