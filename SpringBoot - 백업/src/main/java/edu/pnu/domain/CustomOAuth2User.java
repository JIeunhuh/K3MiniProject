package edu.pnu.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final OAuth2User delegate;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomOAuth2User(Map<String, Object> attributes, Collection<? extends GrantedAuthority> authorities) {
        // Create an instance of DefaultOAuth2User using the attributes and authorities
        this.delegate = new DefaultOAuth2User(authorities, attributes, "name");
        this.authorities = authorities;
    }

    // 이메일과 이름 이외의 추가 정보를 가져오는 메서드
    public String getProfilePicture() {
        // 사용자의 프로필 사진 URL을 반환하도록 구현
        return (String) delegate.getAttribute("profile_picture");
    }

    // 추가 정보를 사용하여 사용자가 특정한 기능을 사용할 수 있는지 체크하는 메서드
    public boolean hasPermission(String permission) {
        // 사용자의 권한 정보에 따라서 특정한 기능에 대한 권한을 체크하도록 구현
        return authorities.contains(new SimpleGrantedAuthority(permission));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return delegate.getAttributes();
    }

    @Override
    public String getName() {
        return delegate.getName();
    }
}
