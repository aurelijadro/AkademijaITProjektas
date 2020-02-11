package it.akademija.doctype;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctypeEntityRepo extends JpaRepository<DoctypeEntity, Long> {

	DoctypeEntity findDoctypeByTitle(String title);

}
