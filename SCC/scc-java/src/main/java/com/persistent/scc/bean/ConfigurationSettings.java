package com.persistent.scc.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Entity
@Table(name = "configuration_settings")
@Data
public class ConfigurationSettings {

    @Id
    @Column(nullable = false, updatable = false)
    private String field;

    @Column(nullable = false)
    private String value;

    @Column
    private String username;

    @CreationTimestamp
    @Column(updatable = false)
    private Date creationTime;

    @UpdateTimestamp
    @Column
    private Date modificationTime;

}
