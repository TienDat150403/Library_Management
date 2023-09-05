package com.a2m.back.service.comm;

/**
 * Author tiennd
 * Created date 2023-07-16
 */
public interface CommonService {
    String getUserUid() throws Exception;

    void clearCacheRole(String userUid) throws Exception;
    
}
