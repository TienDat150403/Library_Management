package com.a2m.sso.service.impl;

import com.a2m.sso.dao.ComSeqDAO;
import com.a2m.sso.service.ComSeqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.TimeZone;
import java.util.UUID;

/**
 * @author tiennd
 */
@Service
public class ComSeqServiceImpl implements ComSeqService {

    @Autowired
    private ComSeqDAO dao;
    
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");

    @Override
    public String getSeq(String seqName) throws SQLException {
        // dao.setSeq(seqName);
        // return dao.getSeq();
        TimeZone zone = TimeZone.getDefault();
        Date now = new Date();
        Long createTime = now.getTime() - zone.getOffset(Calendar.ZONE_OFFSET);
        String userUid = sdf.format(createTime) + getRandom();
        return userUid;
    }

    private String getRandom() {
        String val = new DecimalFormat("000").format(new Random().nextInt(999));
        return val;
    }
    
    
}
