package com.a2m.back.service.user.impl;

import com.a2m.back.dao.user.UserDAO;
import com.a2m.back.model.Role;
import com.a2m.back.model.resp.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

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
        UserResponse user = new UserResponse();
        user.setUserId(username);
        return new UserDetailsImpl(user);
    }

    public UserDetails loadUserByUserUid(String userUid) throws Exception {
        UserResponse user = new UserResponse();
        user.setUserUid(userUid);
        List<Role> roles = userDAO.getRoleForUser(userUid);
        user.setRoles(roles);
        return new UserDetailsImpl(user);
    }
}
