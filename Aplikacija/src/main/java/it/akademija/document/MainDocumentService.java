package it.akademija.document;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MainDocumentService {

	private static final Logger logger = LoggerFactory.getLogger(MainDocumentService.class);

	@Autowired
	MainDocumentRepository mainDocRepository;

	@Transactional
	public List<MainDocument> getMainDocuments() {
		return mainDocRepository.findAll();
	}

	@Transactional
	public MainDocument findDocumentById(Long id) {
		return mainDocRepository.findMainDocumentById(id);
	}

	@Transactional
	public MainDocument addDocument(NewMainDocument newMainDocument) {
		MainDocument document = new MainDocument(newMainDocument.getTitle(), newMainDocument.getSummary());
		logger.debug("New document (ID{}) was added.", document.getId());
		return mainDocRepository.save(document);
	}

	@Transactional
	public MainDocument updateDocument(Long id, NewMainDocument newDocument) {
		MainDocument existingDocument = findDocumentById(id);
		existingDocument.setTitle(newDocument.getTitle());
		existingDocument.setSummary(newDocument.getSummary());
		logger.debug("Document (ID{}) was updated.", existingDocument.getId());
		return existingDocument;
	}

	@Transactional
	public void deleteDocument(MainDocument document) {
		mainDocRepository.delete(document);
		logger.debug("Document (ID{}) was deleted.", document);
	}

	public void addDoctypeTitleToDocument(String title, Long id) {
		MainDocument existingDocument = mainDocRepository.findMainDocumentById(id);
		existingDocument.getDoctypeTitle();
	}

}
