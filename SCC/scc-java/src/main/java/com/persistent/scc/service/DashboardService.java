package com.persistent.scc.service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.SSLException;

import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.persistent.scc.bean.DashboardData;
import com.persistent.scc.dto.DashboardDto;
import com.persistent.scc.dto.MISPDto;
import com.persistent.scc.resource.ESCountResponse;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

@Slf4j
@Service
public class DashboardService {

    private static final String MISP_API_KEY = "mtEMfxKHGMGgnC9JUncjDxhGjoLjOVjQHfUEt6I1";
    private static final String TIP_HOST = "https://bhd025129.persistent.co.in";
    private static final String SO_ELASTICSEARCH_HOST = "http://bhd10934.persistent.co.in:9200";
    private static final String SO_COUNT_Q_EVENT_CATEGORY_HOST = "/*:so-*/_count?q=event.category:host";
    private static final String SO_COUNT_Q_EVENT_CATEGORY_NETWORK = "/*:so-*/_count?q=event.category:network";
    private static final String SO_COUNT_Q_EVENT_DATASET_ALERT = "/*:so-*/_count?q=event.dataset:alert";

    private final WebClient webClient;

    public DashboardService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(SO_ELASTICSEARCH_HOST).build();
    }

    public DashboardDto getDashboardData() {

        DashboardDto detectionDataFlux = new DashboardDto();

        log.info("Before sending host request");

        ESCountResponse hostDetectionDataFlux = webClient.get().uri(SO_COUNT_Q_EVENT_CATEGORY_HOST)
            .accept(MediaType.APPLICATION_JSON).retrieve().bodyToMono(ESCountResponse.class)
            .onErrorResume(WebClientResponseException.class,
                ex -> ex.getRawStatusCode() == 404 ? Mono.empty() : Mono.error(ex))
            .block();
        log.info("After sending host request");

        ESCountResponse networkDetectionDataFlux = webClient.get().uri(SO_COUNT_Q_EVENT_CATEGORY_NETWORK)
            .accept(MediaType.APPLICATION_JSON).retrieve().bodyToMono(ESCountResponse.class)
            .onErrorResume(WebClientResponseException.class,
                ex -> ex.getRawStatusCode() == 404 ? Mono.empty() : Mono.error(ex))
            .block();
        log.info("After sending network request");

        List<MISPDto> mispData = fetchMISPData();

        detectionDataFlux.setHostDetectionCount(hostDetectionDataFlux.getCount());
        detectionDataFlux.setNetworkDetectionCount(networkDetectionDataFlux.getCount());
        detectionDataFlux.setMispEventsCount((long) mispData.size());

        log.info("After setting all data");

        return detectionDataFlux;
    }

    public Flux<MISPDto> getDashboardMISPData() {

        log.info("Before sending host request");
        Flux<MISPDto> mispData = fetchMISPDataFlux();

        log.info("After setting all data");

        return mispData;
    }

    List<MISPDto> fetchMISPData() {

        List<MISPDto> mispList = new ArrayList<MISPDto>();
        List<MISPDto> collectList = new ArrayList<MISPDto>();
        SslContext context;
        try {
            context = SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build();

            HttpClient httpClient = HttpClient.create().secure(t -> t.sslContext(context))
                .responseTimeout(Duration.ofSeconds(60));

            WebClient wc = WebClient.builder().exchangeStrategies(
                configurer -> configurer.codecs(consumer -> consumer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)))
                .clientConnector(new ReactorClientHttpConnector(httpClient)).build();

            log.info("Before sending MISP request");
            Flux<MISPDto> mispDetectionDataFlux = wc.post().uri(TIP_HOST + "/events/index").headers(headers -> {
                headers.set("Authorization", MISP_API_KEY);
                headers.set("Accept", MediaType.APPLICATION_JSON.toString());
            }).body(Flux.just("{\"minimal\": \"1\"}"), String.class).retrieve().bodyToFlux(MISPDto.class);

            log.info("MISP Request sent");

            /*
             * 
             * mispDetectionDataFlux.subscribe(collectList::add);
             * 
             */
            mispList = mispDetectionDataFlux.collectList().block();
            log.info("After blockLast");

            log.info(mispList.toString());
            log.info(String.valueOf(mispList.size()));

        } catch (SSLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return mispList;
    }

    Flux<MISPDto> fetchMISPDataFlux() {

        SslContext context;
        Flux<MISPDto> mispDetectionDataFlux = null;
        try {
            context = SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build();

            HttpClient httpClient = HttpClient.create().secure(t -> t.sslContext(context))
                .responseTimeout(Duration.ofSeconds(60));

            WebClient wc = WebClient.builder().exchangeStrategies(
                configurer -> configurer.codecs(consumer -> consumer.defaultCodecs().maxInMemorySize(16 * 1024 * 1024)))
                .clientConnector(new ReactorClientHttpConnector(httpClient)).build();

            log.info("Before sending request");

            mispDetectionDataFlux = wc.post().uri(TIP_HOST + "/events/index").headers(headers -> {
                headers.set("Authorization", MISP_API_KEY);
                headers.set("Accept", MediaType.APPLICATION_JSON.toString());
            }).body(Flux.just("{\"minimal\": \"1\"}"), String.class).retrieve().bodyToFlux(MISPDto.class);

            log.info("Request sent");
            log.info("Before blockLast");
            mispDetectionDataFlux.blockLast();

        } catch (SSLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return mispDetectionDataFlux;
    }

    public Flux<String> getDashboardDataString() {

        // return fetchDetectionLogCount();
        Flux<String> hostDetectionDataFlux = webClient.get().uri(SO_COUNT_Q_EVENT_CATEGORY_HOST).retrieve()
            .bodyToFlux(String.class);

        hostDetectionDataFlux.subscribe(data -> {
            System.out.println(data.toString());
        });

        return hostDetectionDataFlux;
    }

    private Flux<DashboardDto> fetchDetectionCountOverKibana() throws SSLException {
        DashboardData dashboardData = null;

        SslContext context = SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build();

        HttpClient httpClient = HttpClient.create().secure(t -> t.sslContext(context));

        WebClient wc = WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient)).build();

        String userName = "deepak_agarwal@gmail.com";
        String password = "123456789";
        Flux<DashboardDto> dashboardDataFlux = wc.post()
            // .uri("https://api.publicapis.org/entries")
            .uri("https://bhd10934.persistent.co.in/so/kibana/internal/search/es").headers(headers -> {
                headers.setBasicAuth(userName, password);
                headers.set("kbn-version", "7.9.3");
            })
            .body(Flux.just(
                "{\"params\":{\"index\":\"*:so-*\",\"body\":{\"aggs\":{\"2\":{\"date_histogram\":{\"field\":\"@timestamp\",\"calendar_interval\":\"1w\",\"time_zone\":\"Asia/Calcutta\",\"min_doc_count\":1}}},\"size\":0,\"stored_fields\":[\"*\"],\"script_fields\":{\"Push to TheHive\":{\"script\":{\"source\":\"\'https://bhd10934.persistent.co.in/soctopus/thehive/case/\' + doc[\'_id\'].value\",\"lang\":\"painless\"}}},\"docvalue_fields\":[{\"field\":\"@timestamp\",\"format\":\"date_time\"}],\"_source\":{\"excludes\":[]},\"query\":{\"bool\":{\"must\":[],\"filter\":[{\"bool\":{\"should\":[{\"match\":{\"event.category\":\"host\"}}],\"minimum_should_match\":1}},{\"range\":{\"@timestamp\":{\"gte\":\"2020-08-13T08:15:49.570Z\",\"lte\":\"2021-08-13T08:15:49.570Z\",\"format\":\"strict_date_optional_time\"}}}],\"should\":[],\"must_not\":[]}}},\"rest_total_hits_as_int\":true,\"ignore_unavailable\":true,\"ignore_throttled\":true,\"preference\":1628842545830,\"timeout\":\"30000ms\"}}"),
                String.class)
            .retrieve().bodyToFlux(DashboardDto.class);

        dashboardDataFlux.subscribe(data -> {
            System.out.println(data.toString());
        });
        // dashboardDataFlux.error(error);

        // dashboardData = convertDashboardData(dashboardDataFlux);

        return dashboardDataFlux;
    }

    @SuppressWarnings("unused")
    private DashboardData convertDashboardData(Flux<DashboardDto> dashboardDataFlux) {
        // DashboardData dashboardData = new DashboardData();

        // dashboardData.setDetectionCount(dashboardDataFlux.getHits());
        return null;
    }
}
