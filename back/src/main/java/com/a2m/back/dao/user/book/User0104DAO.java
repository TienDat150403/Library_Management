package com.a2m.back.dao.user.book;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.NotificationResponse;
import com.a2m.back.model.user.book.NotificationDto;

@Mapper
public interface User0104DAO {

	int addNotification(NotificationDto notification);
	
	int countNoti(String userUid);
	
	int countNotiUnread(String userUid);
//	int deleteNotification(NotificationDto notification);
	
	List<NotificationResponse> getNotificationByUserUid(String userUid, int ignore);
	
	int updateStatusIsReadTrue(String notification_id);

}
