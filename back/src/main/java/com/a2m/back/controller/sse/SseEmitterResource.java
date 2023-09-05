package com.a2m.back.controller.sse;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.a2m.back.constant.CommonConstants;
import com.a2m.back.model.resp.DataResponse;
import com.a2m.back.service.sse.SeeEmitterService;
import com.a2m.back.service.sse.SeeNotificationService;

/**
 * @author tiennd
 */

@RestController
@RequestMapping("api/public")
public class SseEmitterResource {

    private static final Logger log = LoggerFactory.getLogger(SseEmitterResource.class);

    @Autowired
    private SeeEmitterService seeEmitterService;

    @Autowired
    private SeeNotificationService seeNotificationService;

    @GetMapping("subscribe/{userUid}")
    public SseEmitter subscribeToEvents(@PathVariable String userUid) {
        log.info("Subscribing member with userUid {}", userUid);
        return seeEmitterService.subscribe(userUid);
    }
    

    @GetMapping("emit/{receiveUid}")
    public ResponseEntity<DataResponse> emit(@RequestParam String mess, @PathVariable String receiveUid) {
        DataResponse resp = new DataResponse();
        try {
            seeNotificationService.sendSseNotification(receiveUid, mess);
            resp.setStatus(CommonConstants.RESULT_OK);
        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(CommonConstants.RESULT_NG);
        }
        return ResponseEntity.ok(resp);
    }
}
