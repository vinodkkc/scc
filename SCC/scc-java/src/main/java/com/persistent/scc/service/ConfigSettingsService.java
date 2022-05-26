package com.persistent.scc.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.persistent.scc.bean.ConfigurationSettings;
import com.persistent.scc.repository.ConfigSettingsRepo;

@Service
public class ConfigSettingsService {

    @Autowired
    ConfigSettingsRepo configSettingsRepo;

    public List<ConfigurationSettings> getAllURLs() {
        return configSettingsRepo.findAll();
    }

    public void updateConfiguartionSettings(String field, ConfigurationSettings configurationSettings,
        String loggedInUsername) {
        Optional<ConfigurationSettings> updateconfig = configSettingsRepo.findById(field);

        if (updateconfig.isEmpty()) {
            throw new IllegalArgumentException("Field Not Found");
        } else {
            ConfigurationSettings config = new ConfigurationSettings();
            config.setField(configurationSettings.getField());
            config.setValue(configurationSettings.getValue());
            config.setUsername(loggedInUsername);
            configSettingsRepo.save(config);
        }
    }

    public ConfigurationSettings findByfield(String field) {
        ConfigurationSettings configurationSettings = configSettingsRepo.findByfield(field);
        if (configurationSettings == null) {
            throw new IllegalArgumentException("Field Not Found");
        }
        return configSettingsRepo.findByfield(field);

    }

    public void saveAllConfigurationSettings(List<ConfigurationSettings> configurationSettings, String loggedInUser) {
        for (int i = 0; i < configurationSettings.size(); i++) {
            if (configSettingsRepo.existsById(configurationSettings.get(i).getField())) {
                throw new IllegalArgumentException("Field Already Exits");
            } else {

                ConfigurationSettings config = new ConfigurationSettings();
                config.setField(configurationSettings.get(i).getField());
                config.setValue(configurationSettings.get(i).getValue());
                config.setUsername(loggedInUser);
                configSettingsRepo.save(config);
            }

        }
    }

}
