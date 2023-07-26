package edu.pnu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import edu.pnu.domain.Member;

public interface MemberRepository extends JpaRepository<Member, String>{

}
