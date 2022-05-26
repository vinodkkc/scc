package com.persistent.scc.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.persistent.scc.bean.Users;

@SuppressWarnings("serial")
public class UserPrincipal implements UserDetails {

    private Users user;

    public UserPrincipal(Users user) {
        super();
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        String roleName = "ROLE_" + ((Users) this.user).getRole().toString();
        grantedAuthorities.add(new SimpleGrantedAuthority(roleName));
        System.out.println("inside details impl " + grantedAuthorities.get(0).getAuthority());
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

    public Users getUserDetails() {
        return user;
    }

    public long getuserID() {
        // TODO Auto-generated method stub
        return user.getUserID();
    }

}
