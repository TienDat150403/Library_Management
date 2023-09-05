package com.a2m.back.service.sse;

public interface SeeNotificationService {
    void sendSseNotification(String userUid, String data);
//	  void sendSseNotification(String userUid, Object T);
}
