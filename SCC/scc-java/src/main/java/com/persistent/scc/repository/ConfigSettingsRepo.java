package com.persistent.scc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.persistent.scc.bean.ConfigurationSettings;

public interface ConfigSettingsRepo extends JpaRepository<ConfigurationSettings, String> {

    ConfigurationSettings findByfield(String field);

}
