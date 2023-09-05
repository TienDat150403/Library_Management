package com.a2m.back.service.comm.impl;

import com.a2m.back.service.comm.CommonService;
import com.a2m.back.util.JwtProvinderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * Author tiennd
 * Created date 2023-07-16
 */

@Service
public class CommonServiceImpl implements CommonService {

    @Autowired
    private JwtProvinderUtils jwtProvinder;

    @Override
    public String getUserUid() throws Exception {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        String accessToken = jwtProvinder.parseJwt(request);
        String userUid = jwtProvinder.getUserUidFromJwtToken(accessToken);
        return userUid;
    }

    @CacheEvict("role")
    @Override
    public void clearCacheRole(String userUid) throws Exception {

    }
    
}
