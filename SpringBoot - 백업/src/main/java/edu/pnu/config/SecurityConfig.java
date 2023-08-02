package edu.pnu.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import edu.pnu.config.filter.JWTAuthenticationFilter;
import edu.pnu.persistence.MemberRepository;
import edu.pnu.service.BoardOAuth2UserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private BoardOAuth2UserDetailsService boardOAuth2UserDetailsService;
    
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private AuthenticationConfiguration authConfiguration;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void setAuthenticationConfiguration(AuthenticationConfiguration authConfiguration) {
        this.authConfiguration = authConfiguration;
    }

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(abcd -> abcd.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    	http.csrf(csrf->csrf.disable()); // CSRF 보호 비활성화 (JS에서 호출 가능)
    	http.cors(cors->cors.disable()); // CORS 보호 비활성화 (React에서 호출 가능):RestAPI로 호출할 때
    	http.formLogin(frmLogin->frmLogin.disable()); // Form을 이용한 로그인을 사용하지 않겠다는 설정
    	
//        http.oauth2Login(oauth2 -> {
//            oauth2.loginPage("/loginGoogle")
//                    .userInfoEndpoint(uend -> uend.userService(boardOAuth2UserDetailsService))
//                    .defaultSuccessUrl("/loginSuccess", true);
//        });
//        http.addFilter(new JWTAuthenticationFilter());
        http.addFilter(new JWTAuthenticationFilter (authConfiguration.getAuthenticationManager(), memberRepository));
        return http.build();
    }
    

}
