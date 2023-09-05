package com.a2m.sso.dao;

import org.apache.ibatis.annotations.Mapper;

/**
 * @author tiennd
 */

@Mapper
public interface ComSeqDAO {

    void setSeq(String seqName);
    String getSeq();
}
