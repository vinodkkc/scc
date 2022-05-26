package com.persistent.scc.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Data
@JsonSerialize
@JsonIgnoreProperties(ignoreUnknown = true)
public class DashboardDto {
    private Long hostDetectionCount;
    private Long networkDetectionCount;
    private Long mispEventsCount;

    public void setHostDetectionCount(Object count) {
        // TODO Auto-generated method stub

    }

    public void setNetworkDetectionCount(Object count) {
        // TODO Auto-generated method stub

    }

    public void setMispEventsCount(long size) {
        // TODO Auto-generated method stub

    }

    // private MISPDto mispData;
}
