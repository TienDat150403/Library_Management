package com.a2m.back.dao.user;

import com.a2m.back.model.Role;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;

/**
 * Author tiennd
 * Created date 2023-07-08
 */

@Mapper
public interface UserDAO {

    @Cacheable("role")
    List<Role> getRoleForUser(String userUid) throws Exception;
    
    void setRole(String userUid);

}
