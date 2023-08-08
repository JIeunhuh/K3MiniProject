package edu.pnu.service;

import java.util.List;

import edu.pnu.domain.Member;

public interface MemberService {
	Member getMember(Member member);
	void createMember(Member member);
	List<Member> getAllMembers();
	Member authenticate(String id, String password);
}
