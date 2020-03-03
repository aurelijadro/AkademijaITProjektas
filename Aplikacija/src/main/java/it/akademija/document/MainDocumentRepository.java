package it.akademija.document;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.doctype.DoctypeEntity;

public interface MainDocumentRepository extends JpaRepository<MainDocument, Long> {

	MainDocument findMainDocumentById(Long id);

	List<MainDocument> findAllByDoctypes(DoctypeEntity doctypes);

}
