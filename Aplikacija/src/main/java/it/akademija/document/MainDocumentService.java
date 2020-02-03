package it.akademija.document;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MainDocumentService {

	MainDocumentRepository mainDocRepository;

	@Autowired
	public MainDocumentService(MainDocumentRepository mainDocRepository) {
		super();
		this.mainDocRepository = mainDocRepository;
	}
	
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
		MainDocument document = new MainDocument(newMainDocument.getTitle(), newMainDocument.getSummary()
//				, newMainDocument.getUrl()
				);
		return mainDocRepository.save(document);
	}
	
	@Transactional
	public MainDocument updateDocument(Long id, NewMainDocument newDocument) {
		MainDocument existingDocument = findDocumentById(id);
		existingDocument.setTitle(newDocument.getTitle());
		existingDocument.setSummary(newDocument.getSummary());
//		existingDocument.setUrl(newDocument.getUrl());
		return existingDocument;
	}
	
	@Transactional
	public void deleteDocument(Long id) {
		MainDocument existingDocument = findDocumentById(id);
		mainDocRepository.delete(existingDocument);
	}
}
