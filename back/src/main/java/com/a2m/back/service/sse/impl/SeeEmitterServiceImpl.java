package com.a2m.back.service.sse.impl;

import com.a2m.back.dao.sse.SeeEmitterRepository;
import com.a2m.back.service.sse.SeeEmitterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class SeeEmitterServiceImpl implements SeeEmitterService {

    private static final Logger log = LoggerFactory.getLogger(SeeEmitterServiceImpl.class);

    @Autowired
    private SeeEmitterRepository seeEmitterRepository;
    
    @Override
    public SseEmitter subscribe(String userUid) {
    	
    	seeEmitterRepository.remove(userUid);
    	
        SseEmitter emitter = new SseEmitter(-1L);
        emitter.onCompletion(() -> seeEmitterRepository.remove(userUid));
        emitter.onTimeout(() -> seeEmitterRepository.remove(userUid));
        emitter.onError(e -> {
            log.error("Create SseEmitter exception", e);
            seeEmitterRepository.remove(userUid);
        });
        seeEmitterRepository.addEmitter(userUid, emitter);
        return emitter;
    }
}
