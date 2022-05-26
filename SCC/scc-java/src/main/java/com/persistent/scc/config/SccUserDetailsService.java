package com.persistent.scc.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.persistent.scc.bean.Users;
import com.persistent.scc.repository.UserRepo;

@Service
public class SccUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        Users user = userRepo.findByUsername(userName);
        if (user == null)
            throw new UsernameNotFoundException("User Not Found");
        return new UserPrincipal(user);
    }
}
