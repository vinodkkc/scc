package com.persistent.scc.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Data
@JsonSerialize
@JsonIgnoreProperties(ignoreUnknown = true)
public class MISPDto {

    String id;
    String uuid;
    Boolean published;

    String timestamp;
}
