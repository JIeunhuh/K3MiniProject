package edu.pnu.config;
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
                .antMatchers("/login", "/restaurants/**", "/cities", "/register").permitAll()
                .anyRequest().authenticated();
        });

        http.addFilterBefore(new AuthenticationFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

        http.cors(); // CORS 활성화

        return http.build();
    }


    
//    @Bean
//    public AuthenticationManager getAuthenticationManager() throws Exception{
//    	return authenticationManager();
//    }

//  @Override
//  protected void configure(HttpSecurity http) throws Exception{
//      http.sessionManagement(abcd -> abcd.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//      http.csrf().disable()
//      .sessionManagement()
//      .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//      .authorizeRequests()
//      .antMatchers("/login", "/restaurants/**", "/cities", "/register").permitAll() // 로그인 및 특정 public 리소스는 인증 없이 접근 허용
//      .anyRequest().authenticated()
//      .and()
//      .cors();
//  }
    
//    @Override
//    protected void configure(HttpSecurity http) throws Exception{
//        http.sessionManagement(abcd -> abcd.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
////    	http.csrf(csrf->csrf.disable()); // CSRF 보호 비활성화 (JS에서 호출 가능)
//        http.csrf().disable()
//        .sessionManagement()
//        .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//        .authorizeRequests()
//        // /login 엔트포인트에 대한 POST요청은 보호되지 않음
////        .antMatchers(HttpMethod.POST, "/login").permitAll()
//        .antMatchers("/login", "/restaurants/**").permitAll() // 로그인 및 특정 public 리소스는 인증 없이 접근 허용
//        .anyRequest().authenticated();
////    	http.cors(cors->cors.disable()); // CORS 보호 비활성화 (React에서 호출 가능):RestAPI로 호출할 때
//    	
////    	http.formLogin(frmLogin->frmLogin.disable()); // Form을 이용한 로그인을 사용하지 않겠다는 설정
////        http.addFilter(new JWTAuthenticationFilter (authConfiguration.getAuthenticationManager(), memberRepository));
////        return http.build();
//    }
    
//    @Autowired
//    public void setAuthenticationConfiguration(AuthenticationConfiguration authConfiguration) {
//        this.authConfiguration = authConfiguration;
//    }

//    @Bean
//    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.sessionManagement(abcd -> abcd.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//    	http.csrf(csrf->csrf.disable()); // CSRF 보호 비활성화 (JS에서 호출 가능)
//    	http.cors(cors->cors.disable()); // CORS 보호 비활성화 (React에서 호출 가능):RestAPI로 호출할 때
//    	http.formLogin(frmLogin->frmLogin.disable()); // Form을 이용한 로그인을 사용하지 않겠다는 설정
//    	
////        http.oauth2Login(oauth2 -> {
////            oauth2.loginPage("/loginGoogle")
////                    .userInfoEndpoint(uend -> uend.userService(boardOAuth2UserDetailsService))
////                    .defaultSuccessUrl("/loginSuccess", true);
////        });
////        http.addFilter(new JWTAuthenticationFilter());
//        http.addFilter(new JWTAuthenticationFilter (authConfiguration.getAuthenticationManager(), memberRepository));
//        return http.build();
//    }
}
