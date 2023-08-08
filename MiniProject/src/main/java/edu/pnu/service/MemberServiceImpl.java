package edu.pnu.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.pnu.domain.Member;
import edu.pnu.persistence.MemberRepository;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private MemberRepository memberRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public Member getMember(Member member) {
		Optional<Member> findMember = memberRepo.findById(member.getId());
		if(findMember.isPresent())
			return findMember.get();
		else return null;
	}
	
	// setEnabled이 False면 로그인 안됨!!
	@Override
	public void createMember(Member member) {
		member.setId(member.getId());
		String encodedPassword = passwordEncoder.encode(member.getPassword());
		member.setPassword(encodedPassword);
		member.setName(member.getName());
		member.setNickname(member.getNickname());
		member.setRole("ROLE_USER");
		member.setEnabled(true);
		memberRepo.save(member);
	}
	
    @Autowired
    public void MemberService(MemberRepository memberRepo) {
        this.memberRepo = memberRepo;
    }
    
    @Autowired
    public List<Member> getAllMembers() {
        return memberRepo.findAll();
    }
    
    @Override
    public Member authenticate(String id, String password) {
        Member member = memberRepo.findById(id).orElse(null);
        
        if (member != null && passwordEncoder.matches(password, member.getPassword())) {
            return member;
        }
        
        return null;
    }
    
}
