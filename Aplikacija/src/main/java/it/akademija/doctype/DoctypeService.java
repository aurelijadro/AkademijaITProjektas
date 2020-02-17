package it.akademija.doctype;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.document.MainDocument;
import it.akademija.group.GroupEntityRepo;

@Service
public class DoctypeService {

	@Autowired
	DoctypeEntityRepo doctypeRepo;

	@Autowired
	GroupEntityRepo groupRepo;

	@Transactional
	public DoctypeEntity findDoctypeByTitle(String title) {
		return doctypeRepo.findDoctypeByTitle(title);
	}

	@Transactional
	public DoctypeEntity findDoctypeById(Long id) {
		return doctypeRepo.findDoctypeById(id);
	}

	@Transactional
	public List<DoctypeEntity> getAllDoctypes() {
		return doctypeRepo.findAll();
	}

	@Transactional
	public DoctypeEntity createNewDoctype(NewDoctype newDoctype) {
		DoctypeEntity doctype = new DoctypeEntity(newDoctype.getTitle());
		return doctypeRepo.save(doctype);
	}

	@Transactional
	public DoctypeEntity updateDoctypeInfo(Long id, NewDoctype newDoctype) {
		DoctypeEntity existingDoctype = findDoctypeById(id);
		existingDoctype.setTitle(newDoctype.getTitle());
		return existingDoctype;
	}

	@Transactional
	public void deleteDoctype(DoctypeEntity doctype) {
		doctypeRepo.delete(doctype);
	}

	@Transactional
	public void addDoctypeToDocuments(DoctypeEntity doctype, MainDocument document) {
		doctype.addDocument(document);
		doctypeRepo.save(doctype);
	}

}
