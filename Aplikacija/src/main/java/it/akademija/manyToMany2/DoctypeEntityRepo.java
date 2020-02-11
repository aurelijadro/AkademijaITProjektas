package it.akademija.manyToMany2;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctypeEntityRepo extends JpaRepository<DoctypeEntity, Long> {

	DoctypeEntity findDoctypeByTitle(String title);

}
