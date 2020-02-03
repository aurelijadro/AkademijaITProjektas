package it.akademija.document;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MainDocumentRepository extends JpaRepository<MainDocument, Long> {

	MainDocument findMainDocumentById(Long id);

}
