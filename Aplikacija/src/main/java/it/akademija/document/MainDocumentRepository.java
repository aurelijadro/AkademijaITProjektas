package it.akademija.document;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.doctype.DoctypeEntity;

public interface MainDocumentRepository extends JpaRepository<MainDocument, Long> {

	MainDocument findMainDocumentById(Long id);

	List<MainDocument> findAllByDoctypesAndDocumentStatusOrderBySubmissionDateDesc(DoctypeEntity doctypes,
			String documentStatus);

	List<MainDocument> findAllByCreatorIdAndDocumentStatus(Long creatorId, String documentStatus);

	List<MainDocument> findAllByCreatorIdAndDocumentStatusNotOrderBySubmissionDateDesc(Long creatorId,
			String documentStatus);

}
