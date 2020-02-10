package it.akademija.newGroup;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupClassRepository extends JpaRepository<GroupClass, Long> {

	GroupClass findGroupClassByTitle(String title);

}
