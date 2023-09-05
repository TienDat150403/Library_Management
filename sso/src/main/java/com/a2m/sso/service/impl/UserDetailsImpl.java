package com.a2m.sso.service.impl;

import com.a2m.sso.constant.CommonConstants;
import com.a2m.sso.model.UserResponse;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Author tiennd
 * Created date 2023-07-08
 */
public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private UserResponse user;

    public UserDetailsImpl(UserResponse user) {
        super();
        this.user = user;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPwd();
    }

    @Override
    public String getUsername() {
        return user.getUserUid();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        if (user.getStatus().equals(CommonConstants.UserStatus.ACTIVED.getStatus())) {
            return true;
        }
        return false;
    }
}
