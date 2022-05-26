package com.persistent.scc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.persistent.scc.dto.DashboardDto;
import com.persistent.scc.dto.MISPDto;
import com.persistent.scc.service.DashboardService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;

@Slf4j
@RestController
public class DashboardController {

    // private static final Logger log =
    // LoggerFactory.getLogger(DashboardController.class);

    @Autowired
    DashboardService dashboardService;

    @GetMapping("/dashboard/detection")
    public ResponseEntity<DashboardDto> getDashboardData() {
        DashboardDto dashboardData = null;

        dashboardData = dashboardService.getDashboardData();
        log.debug("Dashboard Data:: ", dashboardData);
        return ResponseEntity.ok(dashboardData);
    }

    @GetMapping("/dashboard/misp")
    public ResponseEntity<Flux<MISPDto>> getMISPDashboardData() {
        Flux<MISPDto> dashboardData = null;

        dashboardData = dashboardService.getDashboardMISPData();
        log.debug("Dashboard Data:: ", dashboardData);
        log.info("MISP Data size:: ", dashboardData.collectList().block().size());
        return ResponseEntity.ok(dashboardData);
    }

    @GetMapping("/dashboard/detectionString")
    public Flux<String> getDashboardDataString() {
        Flux<String> dashboardData = null;
        // try {
        dashboardData = dashboardService.getDashboardDataString();
        // } catch (SSLException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // }
        return dashboardData;
    }

    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<String> handleWebClientResponseException(WebClientResponseException ex) {
        log.error("Error from WebClient - Status {}, Body {}", ex.getRawStatusCode(), ex.getResponseBodyAsString(), ex);
        return ResponseEntity.status(ex.getRawStatusCode()).body(ex.getResponseBodyAsString());
    }
}
