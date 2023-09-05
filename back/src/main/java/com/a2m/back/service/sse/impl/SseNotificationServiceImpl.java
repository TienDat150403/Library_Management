package com.a2m.back.service.sse.impl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.sse.SeeEmitterRepository;
import com.a2m.back.service.sse.SeeNotificationService;

/**
 * @author tiennd
 */

@Service
public class SseNotificationServiceImpl implements SeeNotificationService {

    @Autowired
    private SeeEmitterRepository seeEmitterRepository;

    @Override
    public void sendSseNotification(String userUid, String data) {
        seeEmitterRepository.get(userUid).ifPresentOrElse(sseEmitter -> {
            try {
                sseEmitter.send(data);
            } catch (IOException e) {
                e.printStackTrace();
                seeEmitterRepository.remove(userUid);
            }
        }, () -> {
            System.out.println("Value is empty");
        });
    }
}
