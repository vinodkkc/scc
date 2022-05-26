package com.persistent.scc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.persistent.scc.config.LdapUserPrincipal;
import com.persistent.scc.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class LoginController {
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LdapUserPrincipal> authorization() {
        LdapUserPrincipal principal = userService.getUserDetails();
        log.info("Inside Controller" + principal);
        return ResponseEntity.ok().body(principal);

    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("logout.");// With this way, we will get information about user’s authentication by using
                                      // SecurityContextHolder.getContext().getAuthentication().
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);// If user was, then, we called
                                                                               // SecurityContextLogoutHandler().logout(request,
                                                                               // response, auth) to logout user
                                                                               // properly.
        }
        return "redirects:/login";
    }

}
