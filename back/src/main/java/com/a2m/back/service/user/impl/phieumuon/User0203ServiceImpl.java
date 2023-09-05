package com.a2m.back.service.user.impl.phieumuon;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a2m.back.dao.user.phieumuon.User0203DAO;
import com.a2m.back.model.resp.phieumuonResponse;
import com.a2m.back.service.sse.SeeNotificationService;
import com.a2m.back.service.user.phieumuon.User0203Service;

@Service
public class User0203ServiceImpl implements User0203Service {
    @Autowired
    User0203DAO user0203DAO;
    
    @Autowired
    private SeeNotificationService seeNotificationService;
    
    @Override
    public int extendReturnDate(phieumuonResponse phieumuon) {
//        phieumuon = user0203DAO.getPhieuMuonInfo(phieumuon.getIdPhieuMuon());
        LocalDate currentDate = LocalDate.now();
        LocalDate returnDateEstimate = phieumuon.getReturnDateEstimate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        if (phieumuon.getExtended_times() == 1) return 0;
        else if (ChronoUnit.DAYS.between(currentDate, returnDateEstimate) <= 1) return 1;
        else {
        	user0203DAO.extendReturnDate(phieumuon);
        }
        return 2;
    }
}
