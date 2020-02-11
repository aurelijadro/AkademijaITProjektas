package it.akademija.group;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupEntityRepo extends JpaRepository<GroupEntity, Long> {

	GroupEntity findGroupEntityByTitle(String title);

	GroupEntity findGroupEntityById(Long id);

}
