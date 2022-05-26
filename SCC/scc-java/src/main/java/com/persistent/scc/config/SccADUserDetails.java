package com.persistent.scc.config;

import java.util.Collection;

import javax.naming.NamingException;
import javax.naming.directory.Attributes;

import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.security.ldap.userdetails.LdapUserDetailsMapper;

public class SccADUserDetails extends LdapUserDetailsMapper {
    private LdapUserPrincipal ldapUser;
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

    @Override
    public LdapUserDetails mapUserFromContext(DirContextOperations ctx, String username,
        Collection<? extends GrantedAuthority> authorities) {
        Attributes attributes = ctx.getAttributes();
        LdapUserDetails ldapUserDetails = (LdapUserDetails) super.mapUserFromContext(ctx, username, authorities);
        try {
            cn = attributes.get("cn").get().toString();
            sn = attributes.get("sn").get().toString();
            givenName = attributes.get("givenName").get().toString();
            displayName = attributes.get("displayName").get().toString();
            memberOf = attributes.get("memberOf").get().toString();
            userAccountControl = attributes.get("userAccountControl").get().toString();
            sAMAccountName = attributes.get("sAMAccountName").get().toString();
            userPrincipalName = attributes.get("userPrincipalName").get().toString();
            objectCategory = attributes.get("objectCategory").get().toString();
            mail = attributes.get("mail").get().toString();

        } catch (NamingException e) {
            e.printStackTrace();
        }
        ldapUser = new LdapUserPrincipal(ldapUserDetails);
        ldapUser.setCn(cn);
        ldapUser.setSn(sn);
        ldapUser.setGivenName(givenName);
        ldapUser.setDisplayName(displayName);
        ldapUser.setMemberOf(memberOf);
        ldapUser.setUserAccountControl(userAccountControl);
        ldapUser.setSAMAccountName(sAMAccountName);
        ldapUser.setUserPrincipalName(userPrincipalName);
        ldapUser.setObjectCategory(objectCategory);
        ldapUser.setMail(mail);
        return ldapUser;
    }

    @Override
    public void mapUserToContext(UserDetails user, DirContextAdapter ctx) {

    }

}
