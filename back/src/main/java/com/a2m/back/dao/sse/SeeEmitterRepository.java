package com.a2m.back.dao.sse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SeeEmitterRepository {

    private static final Logger log = LoggerFactory.getLogger(SeeEmitterRepository.class);
    private Map<String, SseEmitter> userEmitterMap = new ConcurrentHashMap<>();

    public void addEmitter(String memberId, SseEmitter emitter) {
        userEmitterMap.put(memberId, emitter);
    }

    public void remove(String memberId) {
        if (userEmitterMap != null && userEmitterMap.containsKey(memberId)) {
            log.info("Removing emitter for member: {}", memberId);
            userEmitterMap.remove(memberId);
        } else {
            log.info("No emitter to remove for member: {}", memberId);
        }
    }

    public Optional<SseEmitter> get(String memberId) {
        return Optional.ofNullable(userEmitterMap.get(memberId));
    }
}
