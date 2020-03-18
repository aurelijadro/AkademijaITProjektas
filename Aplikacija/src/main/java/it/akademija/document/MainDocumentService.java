package it.akademija.document;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

		return user.getDocuments().stream()
				.map((document) -> new MainDocument(document.getId(), document.getCreatorId(), document.getTitle(),
						document.getSummary(), document.getDocumentStatus(), document.getSubmissionDate(),
						document.getApprovalDate(), document.getRejectionDate(), document.getApproverId(),
						document.getRejectionReason()))
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
	public MainDocument updateDocument(Long documentId, NewMainDocument newDocument, Long doctypeId) {
		DoctypeEntity doctype = doctypeRepo.findDoctypeById(doctypeId);
		MainDocument existingDocument = findDocumentById(documentId);
		existingDocument.getDocumentStatus();
		existingDocument.setTitle(newDocument.getTitle());
		existingDocument.setSummary(newDocument.getSummary());
		existingDocument.setDoctypes(doctype);
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
	public void changeDocumentToSubmitted(Long creatorId, MainDocument document) {
		document.setCreatorId(creatorId);
		document.setSubmissionDate();
		document.updateDocumentStatusToSubmitted();
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
	public void changeDocumentToDenied(Long userId, String rejectionReason, MainDocument document) {
		document.setRejectionDate();
		document.updateDocumentStatusToDenied();
		document.setApproverId(userId);
		document.setRejectionReason(rejectionReason);
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
//		User user = userRepo.findUserById(id);
//		List<MainDocument> submittedDocuments = new ArrayList<MainDocument>();
//		List<MainDocument> usersDocuments = user.getDocuments();
//		for (MainDocument mainDocument : usersDocuments) {
//			if (mainDocument.getDocumentStatus().contains("Pateiktas")) {
//				mainDocument.setCreatorId(id);
//				submittedDocuments.add(mainDocument);
//			}
//		}
//		return submittedDocuments;
		return mainDocRepository.findAllByCreatorIdAndDocumentStatus(id, "Pateiktas");
	}

	@Transactional
	public List<MainDocument> getSubmittedDocumentsByDoctype(DoctypeEntity doctype) {
		return mainDocRepository.findAllByDoctypesAndDocumentStatusOrderBySubmissionDateDesc(doctype, "Pateiktas");
	}

	@Transactional
	public List<MainDocument> getAllNotCreatedDocuments(Long id) {
		return mainDocRepository.findAllByCreatorIdAndDocumentStatusNotOrderBySubmissionDateDesc(id, "Sukurtas");
	}

	public String formatDate(LocalDate date) {
		String dateToString = "";
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("YYYY-MM-DD");
		if (!(date == null)) {
			dateToString = date.format(formatter);
		}
		return dateToString;
	}

	public String convertToCSV(String[] data) {
		return Stream.of(data).collect(Collectors.joining(","));
	}

	public String getUserName(Long userId) {
		User user = userRepo.findUserById(userId);
		String username = user.getName() + " " + user.getSurname();
		return username;
	}

	public void csvFileCreator(Long userId) throws IOException {
		List<MainDocument> documentsForUser = getMainDocuments(userId);
		String filename = "csvFile";
		File file = Paths.get(("/tmp/Uploads/" + userId), filename + ".csv").toFile();
		List<String[]> dataLines = new ArrayList<>();
		dataLines.add(new String[] { "ID", "Author", "Title", "Summary", "Submission date", "Approval date",
				"Rejection date", "Rejection reason" });
		for (MainDocument mainDocument : documentsForUser) {
			dataLines.add(new String[] { mainDocument.getId().toString(), getUserName(userId), mainDocument.getTitle(),
					mainDocument.getSummary(), formatDate(mainDocument.getSubmissionDate()),
					formatDate(mainDocument.getApprovalDate()), formatDate(mainDocument.getRejectionDate()),
					mainDocument.getRejectionReason() });
		}
		try (PrintWriter pw = new PrintWriter(file)) {
			dataLines.stream().map(this::convertToCSV).forEach(pw::println);
		}

	}
}
