package com.persistent.scc.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.persistent.scc.bean.Users;
import com.persistent.scc.config.LdapUserPrincipal;
import com.persistent.scc.repository.UserRepo;

@Service("UserService")
public class UserService {
    @Autowired
    UserRepo userRepo;

    public void insertUser(Users user) {
        userRepo.save(user);
    }

    public Users findByUserName(String userName) {
        return userRepo.findByUsername(userName);
    }

    public void deleteUserById(long userID) {
        userRepo.deleteById(userID);
    }

    public Users saveUser(Users user) {
        userRepo.save(user);
        return user;
    }

    public void updateUser(long userID, Users user) {
        Optional<Users> retrievedUser = userRepo.findById(userID);
        if (retrievedUser == null)
            try {
                throw new Exception("User not found");
            } catch (Exception e) {
                e.printStackTrace();
            }
        userRepo.save(user);
    }

    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    public Users findByUserID(long userID) {
        return userRepo.findById(userID).orElseThrow(IllegalArgumentException::new);
    }

    public LdapUserPrincipal getUserDetails() {
        LdapUserPrincipal principal = (LdapUserPrincipal) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();
        return principal;

    }

}
