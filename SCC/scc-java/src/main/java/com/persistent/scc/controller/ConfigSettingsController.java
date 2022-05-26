package com.persistent.scc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.persistent.scc.bean.ConfigurationSettings;
import com.persistent.scc.service.ConfigSettingsService;
import com.persistent.scc.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ConfigSettingsController {
    public static final String CONFIGURATION_PATH = "/configuration";
    public static final String CONFIGUARTION_FIELD_PATH = "/configuration/{field}";

    @Autowired
    UserService userService;

    @Autowired
    ConfigSettingsService configSettingsService;

    @GetMapping(CONFIGURATION_PATH)
    public List<ConfigurationSettings> getConfigurationSettings() {
        return configSettingsService.getAllURLs();
    }

    @GetMapping(CONFIGUARTION_FIELD_PATH)
    public ConfigurationSettings getconfigByField(@PathVariable("field") String field) {
        return configSettingsService.findByfield(field);
    }

    @PostMapping(CONFIGURATION_PATH)

    public ResponseEntity<String> insertConfigurationSettings(
        @RequestBody List<ConfigurationSettings> configurationSettings) {
        try {
            String loggedInUser = userService.getUserDetails().getUsername();
            log.info(loggedInUser);
            configSettingsService.saveAllConfigurationSettings(configurationSettings, loggedInUser);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

    }

    @PutMapping(CONFIGUARTION_FIELD_PATH)
    public ResponseEntity<String> updateConfigurationSettings(@PathVariable("field") String field,
        @RequestBody ConfigurationSettings configurationSettings) {
        try {
            String loggedInUsername = userService.getUserDetails().getUsername();
            configurationSettings.setUsername(loggedInUsername);
            configSettingsService.updateConfiguartionSettings(field, configurationSettings, loggedInUsername);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException update) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(update.getMessage());

        }
    }

}
