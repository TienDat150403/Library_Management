package com.a2m.back.dao.sys;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.a2m.back.model.resp.UserResponse;
import com.a2m.back.model.sys.EmpDto;

/**
 * Author tiennd
 * Created date 2023-07-17
 */
@Mapper
public interface Sys0101DAO {
    int insert(EmpDto empDto);
     
}
