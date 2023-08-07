package edu.pnu.domain;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Setter
@Getter
@Entity
public class Member {
	@Id
	private String id;
	private String password;
	private String name;
	private String nickname;
	private String role;
	private boolean enabled;
	public Collection<? extends GrantedAuthority> getAuthorities() {		
		return AuthorityUtils.createAuthorityList(role);
		/*Collection<GrantedAuthority> list = new ArrayList<>();
		list.add(new GrantedAuthority() {	
			@Override
			public String getAuthority() {
				// TODO Auto-generated method stub
				return role;
			}
		});
		return list;
		*/
	}
	
    // 비밀번호를 BCrypt로 해시하여 저장하는 메소드
//    public void setPassword(String password) {
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        this.password = passwordEncoder.encode(password);
//    }

    // 비밀번호 일치 여부를 확인하는 메소드
//    public boolean isPasswordMatch(String rawPassword) {
////        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
////        return passwordEncoder.matches(rawPassword, this.password);
//        return new BCryptPasswordEncoder().matches(rawPassword, this.password);
//        
//    }
}
