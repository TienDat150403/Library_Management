package com.a2m.sso.service.impl;

import com.a2m.sso.dao.UserDAO;
import com.a2m.sso.model.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Author tiennd
 * Created date 2023-07-08
 */

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserResponse user = userDAO.getUserByUserId(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        return new UserDetailsImpl(user);
    }

    public UserDetails loadUserByUserUid(String userUid) throws UsernameNotFoundException {
        UserResponse user = userDAO.getUserInfoByUserUid(userUid);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with userUid: " + userUid);
        }
        return new UserDetailsImpl(user);
    }
}
