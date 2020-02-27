package it.akademija.document;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.doctype.DoctypeEntityRepo;
import it.akademija.user.User;
import it.akademija.user.UserRepository;

@Service
public class MainDocumentService {

	private static final Logger logger = LoggerFactory.getLogger(MainDocumentService.class);

	@Autowired
	MainDocumentRepository mainDocRepository;

	@Autowired
	UserRepository userRepo;

	@Autowired
	DoctypeEntityRepo doctypeRepo;

	@Transactional
	public List<MainDocument> getMainDocuments(Long userId) {
		User user = userRepo.findUserById(userId);

		return user
				.getDocuments().stream().map((document) -> new MainDocument(document.getId(), document.getTitle(),
						document.getSummary(), document.getDocumentStatus(), document.getSubmissionDate()))
				.collect(Collectors.toList());
	}

	@Transactional
	public MainDocument findDocumentById(Long id) {
		return mainDocRepository.findMainDocumentById(id);
	}

	@Transactional
	public MainDocument addDocument(NewMainDocument newMainDocument, Long userId, Long doctypeId) {
		User user = userRepo.findUserById(userId);
		DoctypeEntity doctype = doctypeRepo.findDoctypeById(doctypeId);
		MainDocument document = new MainDocument(newMainDocument.getTitle(), newMainDocument.getSummary());
		logger.debug("New document (ID{}) was added.", document.getId());
		document.setDoctypes(doctype);
		document.setCreatorId(userId);
		user.addDocument(document);
		document.setUser(user);
		return mainDocRepository.save(document);

	}

	@Transactional
	public MainDocument updateDocument(Long documentId, NewMainDocument newDocument) {
		MainDocument existingDocument = findDocumentById(documentId);
		existingDocument.getDocumentStatus();
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

//	@Transactional
//	public void addDoctypeToDocument(MainDocument document, DoctypeEntity doctype) {
//		document.setDoctypes(doctype);
//		mainDocRepository.save(document);
//	}

	@Transactional
	public void changeDocumentToSubmitted(Long creatorId, MainDocument document) {
		document.setCreatorId(creatorId);
		document.setSubmissionDate();
		document.updateDocumentStatusToSubmitted();
		document.updateDocumentStatusToPending();
		mainDocRepository.save(document);
	}

	@Transactional
	public void changeDocumentToApproved(Long userId, MainDocument document) {
		document.setApprovalDate();
		document.updateDocumentStatusToApproved();
		document.setApproverId(userId);
		mainDocRepository.save(document);
	}

	@Transactional
	public void changeDocumentToDenied(Long userId, MainDocument document) {
		document.setRejectionDate();
		document.updateDocumentStatusToDenied();
		document.setApproverId(userId);
		document.getRejectionReason();
		mainDocRepository.save(document);
	}

	@Transactional
	public List<MainDocument> createdDocumentsList(Long id) {
		User user = userRepo.findUserById(id);
		List<MainDocument> createdDocuments = new ArrayList<MainDocument>();
		List<MainDocument> usersDocuments = user.getDocuments();
		for (MainDocument mainDocument : usersDocuments) {
			if (mainDocument.getDocumentStatus().contains("Sukurtas")) {
				createdDocuments.add(mainDocument);
			}
		}
		return createdDocuments;
	}

	@Transactional
	public List<MainDocument> submittedDocumentsList(Long id) {
		User user = userRepo.findUserById(id);
		List<MainDocument> submittedDocuments = new ArrayList<MainDocument>();
		List<MainDocument> usersDocuments = user.getDocuments();
		for (MainDocument mainDocument : usersDocuments) {
			if (mainDocument.getDocumentStatus().contains("Pateiktas")) {
				mainDocument.setCreatorId(id);
				submittedDocuments.add(mainDocument);
			}
		}
		return submittedDocuments;
	}

}
