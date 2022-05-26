package com.persistent.scc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

@SpringBootApplication(scanBasePackages = { "com.persistent.scc" })
@EntityScan(basePackages = { "com.persistent.scc" })
@ComponentScan(basePackages = { "com.persistent.scc" })
@EnableJpaRepositories(basePackages = { "com.persistent.scc.repository" })
@EnableAutoConfiguration
@EnableEncryptableProperties
@EnableConfigurationProperties
@EnableWebSecurity
public class SccApplication {
    public static void main(String[] args) {
        SpringApplication.run(SccApplication.class, args);
    }

//    /*
//     * @Bean public SecurityWebFilterChain
//     * functionalValidationsSpringSecurityFilterChain(ServerHttpSecurity http) {
//     * http.authorizeExchange().anyExchange().permitAll(); http.csrf().disable();
//     * return http.build(); }
//     */

//    @Configuration
//    @EnableWebMvc
//    public class WebMvcConfig implements WebMvcConfigurer {
//
//        public void addCorsMappings(CorsRegistry registry) {
//            registry.addMapping("/**").allowedOriginPatterns(".acds.net.in").allowedMethods("GET", "POST", "OPTIONS")
//                .allowedHeaders("*").exposedHeaders("*").allowCredentials(true).maxAge(3600);
//        }
//    }

}
