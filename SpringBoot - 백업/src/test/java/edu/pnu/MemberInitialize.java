package edu.pnu;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import edu.pnu.domain.Member;
import edu.pnu.persistence.MemberRepository;

@SpringBootTest
public class MemberInitialize {
	@Autowired
	MemberRepository memRepo;
	
	PasswordEncoder encoder = new BCryptPasswordEncoder();

	@Test
	public void dowork() {
		memRepo.save(Member.builder()
				.id("member")
				.password(encoder.encode("abcd"))
				.role("ROLE_MEMBER")
				.enabled(true).build());
		memRepo.save(Member.builder()
				.id("manager")
				.password(encoder.encode("abcd"))
				.role("ROLE_MANAGER")
				.enabled(true).build());
		memRepo.save(Member.builder()
				.id("admin")
				.password(encoder.encode("abcd"))
				.role("ROLE_ADMIN")
				.enabled(true).build());
		System.out.println("Member Insert Success");
	}
}
