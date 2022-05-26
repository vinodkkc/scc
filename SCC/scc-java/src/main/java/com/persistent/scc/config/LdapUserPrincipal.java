package com.persistent.scc.config;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapUserDetails;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Data
public class LdapUserPrincipal implements LdapUserDetails {
    @Getter(value = AccessLevel.NONE)
    @Setter(value = AccessLevel.NONE)
    private LdapUserDetails ldapUserDetails;
    private String cn;
    private String sn;
    private String givenName;
    private String displayName;
    private String memberOf;
    private String userAccountControl;
    private String sAMAccountName;
    private String userPrincipalName;
    private String objectCategory;
    private String mail;

    public LdapUserPrincipal(LdapUserDetails ldapUserDetails) {
        this.ldapUserDetails = ldapUserDetails;
        // TODO Auto-generated constructor stub
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return ldapUserDetails.getAuthorities();
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return ldapUserDetails.getPassword();
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return ldapUserDetails.getUsername();
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

    @Override
    public void eraseCredentials() {
        // TODO Auto-generated method stub

    }

    @Override
    public String getDn() {
        // TODO Auto-generated method stub
        return ldapUserDetails.getDn();
    }

}
