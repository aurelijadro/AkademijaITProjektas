package it.akademija.document;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.user.User;
import it.akademija.user.UserRepository;

@Service
public class MainDocumentService {

	private static final Logger logger = LoggerFactory.getLogger(MainDocumentService.class);

	@Autowired
	MainDocumentRepository mainDocRepository;

	@Autowired
	UserRepository userRepo;

	@Transactional
	public List<MainDocument> getMainDocuments(Long userId) {
		User user = userRepo.findUserById(userId);

		return user.getDocuments().stream()
				.map((document) -> new MainDocument(document.getId(), document.getTitle(), document.getSummary()))
				.collect(Collectors.toList());
	}

	@Transactional
	public MainDocument findDocumentById(Long id) {
		return mainDocRepository.findMainDocumentById(id);
	}

	@Transactional
	public MainDocument addDocument(NewMainDocument newMainDocument, Long userId) {
		User user = userRepo.findUserById(userId);
		MainDocument document = new MainDocument(newMainDocument.getTitle(), newMainDocument.getSummary());
		logger.debug("New document (ID{}) was added.", document.getId());
		user.addDocument(document);
		document.setUser(user);
		return mainDocRepository.save(document);
	}

	@Transactional
	public MainDocument updateDocument(Long documentId, NewMainDocument newDocument) {
		MainDocument existingDocument = findDocumentById(documentId);
		existingDocument.setTitle(newDocument.getTitle());
		existingDocument.setSummary(newDocument.getSummary());
		logger.debug("Document (ID{}) was updated.", existingDocument.getId());
		return existingDocument;
	}

	@Transactional
	public void deleteDocument(Long documentId, Long userId) {
		User user = userRepo.findUserById(userId);
		MainDocument document = findDocumentById(documentId);
		mainDocRepository.delete(document);
		userRepo.save(user);
		logger.debug("Document (ID{}) was deleted.", document);
	}

	@Transactional
	public void addDoctypeToDocument(MainDocument document, DoctypeEntity doctype) {
		document.setDoctypes(doctype);
		mainDocRepository.save(document);
	}

}
