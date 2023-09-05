package com.a2m.back.service.sse;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SeeEmitterService {
    SseEmitter subscribe(String userUid);
}
