package edu.pnu.config;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import edu.pnu.config.filter.AuthenticationFilter;
import edu.pnu.persistence.MemberRepository;
import edu.pnu.service.JwtService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private AuthenticationConfiguration authConfiguration;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private JwtService jwtService;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Autowired
   public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
    	auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }
    
	 @Bean
     public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
         AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
         authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
         return authenticationManagerBuilder.build();
     }
    
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.csrf(abcd -> abcd.disable());
        http.sessionManagement(abcd -> abcd.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeRequests(authorize -> {
            authorize
                .antMatchers("/member/**").authenticated()
                .antMatchers("/manager/**").hasAnyRole("MANAGER", "ADMIN")
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/login", "/restaurants/**", "/cities", "/register",
                		"/getBoardList", "/insertBoard","/insertReview","/getReviewList/{id}",
                		"/allmembers", "/deleteReview/{id}","/deleteBoard/{seq}",
                		"/insertComment", "/getCommentList/{seq}","/deleteComment/{id}").permitAll()
                .anyRequest().authenticated();
        });

        http.addFilterBefore(new AuthenticationFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

        http.cors(); // CORS 활성화

        return http.build();
    }
    
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList("*"));
		config.setAllowedMethods(Arrays.asList("*"));
		config.setAllowedHeaders(Arrays.asList("*"));
		config.setAllowCredentials(false);
		config.applyPermitDefaultValues();

		source.registerCorsConfiguration("/**", config);
		return source;
	}	
	

}
