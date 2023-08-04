package edu.pnu.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import edu.pnu.domain.CustomOAuth2User;

@Service
public class BoardOAuth2UserDetailsService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        System.out.println("OAuth2User Authorities: " + oauth2User.getAuthorities());
        System.out.println("OAuth2User Attributes: " + oauth2User.getAttributes());

        // 가져온 사용자 정보 중에서 이메일과 이름을 출력
        String email = (String) oauth2User.getAttribute("email");
        String name = (String) oauth2User.getAttribute("name");
        System.out.println("Email: " + email);
        System.out.println("Name: " + name);

        // Custom Authorities 추가
        Collection<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        Map<String, Object> attributes = oauth2User.getAttributes();
        attributes.put("authorities", authorities);

        return new CustomOAuth2User(attributes, authorities);
    }
}