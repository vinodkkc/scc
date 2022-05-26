package com.persistent.scc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.persistent.scc.bean.Users;
import com.persistent.scc.service.UserService;

@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class UsersController {
    public static final String USER_PATH = "/users";
    public static final String USERID_PATH = "/users/{userID}";
    public static final String SCC_VIEW_ONLY_ROLE = "SCC_View_Only";
    public static final String SCC_READ_WRITE_ROLE = "SCC_Read_Write";
    public static final String ADMIN = "Admin";

    @Autowired
    UserService userService;

    @PostMapping(USER_PATH)
    public String adduser(@RequestBody Users user) {
        userService.insertUser(user);
        return "User inserted Sucessfully";
    }

    @PreAuthorize("hasRole('" + SCC_VIEW_ONLY_ROLE + "') or hasRole('" + ADMIN + "') or hasRole('" + SCC_READ_WRITE_ROLE
        + "')")
    @GetMapping(USER_PATH)
    public List<Users> getUsers(Authentication authentication) {
        return userService.getAllUsers();
    }

    @PreAuthorize("hasRole('" + ADMIN + "') or hasRole('" + SCC_READ_WRITE_ROLE + "')")
    @PutMapping(path = USERID_PATH, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> updateUser(@PathVariable("userID") long userID, @RequestBody Users userDetails)
        throws UsernameNotFoundException {
        Users user = userService.findByUserID(userID);
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        final Users updateUser = userService.saveUser(user);
        return ResponseEntity.ok(updateUser);
    }

    @PreAuthorize("hasRole('" + ADMIN + "')")
    @PostMapping(USERID_PATH)
    public boolean deleteUser(@PathVariable("userID") long userID) {
        userService.deleteUserById(userID);
        return true;
    }

    @PreAuthorize("hasRole('" + SCC_VIEW_ONLY_ROLE + "')")
    @GetMapping(USERID_PATH)
    public Users getUserDetails(@PathVariable("userID") long userID, Authentication authentication) {
        return userService.findByUserID(userID);
    }

}
