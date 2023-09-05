package com.a2m.sso.service.impl;

import com.a2m.sso.service.CommonService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

/**
 * @author tiennd
 */
@Service
public class CommonServiceImpl implements CommonService {

    @CacheEvict("user")
    @Override
    public void clearCacheUser(String userUid) throws Exception {

    }
}
