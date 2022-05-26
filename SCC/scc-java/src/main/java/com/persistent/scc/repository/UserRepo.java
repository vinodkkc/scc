package com.persistent.scc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.persistent.scc.bean.Users;

@Repository("UserRepo")
public interface UserRepo extends JpaRepository<Users, Long> {
    public Users findByUsername(String userName);
}
