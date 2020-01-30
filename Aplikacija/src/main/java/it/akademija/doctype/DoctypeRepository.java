package it.akademija.doctype;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctypeRepository extends JpaRepository<Doctype, Long> {

	Doctype findByTitle(String title);

}
