package edu.pnu.config;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import edu.pnu.service.BoardOAuth2UserDetailsService;

// 비밀번호 보안
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private BoardOAuth2UserDetailsService boardOAuth2UserDetailsService;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http.formLogin(frmLogin->{
			frmLogin.loginPage("/loginGoogle").defaultSuccessUrl("/loginSuccess", true);
		});
		http.oauth2Login(oauth2->{
			oauth2.loginPage("/loginGoogle").userInfoEndpoint(uend->uend.userService(boardOAuth2UserDetailsService))
			.defaultSuccessUrl("/loginSuccess", true);
		});
		return http.build();
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
