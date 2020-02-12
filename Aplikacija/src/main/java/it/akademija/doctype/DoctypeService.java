package it.akademija.doctype;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.group.GroupEntity;
import it.akademija.group.GroupEntityRepo;

@Service
public class DoctypeService {

	@Autowired
	DoctypeEntityRepo doctypeRepo;

	@Autowired
	GroupEntityRepo groupRepo;

	public DoctypeEntity findDoctypeByTitle(String title) {
		return doctypeRepo.findDoctypeByTitle(title);
	}

	public List<DoctypeEntity> getAllDoctypes() {
		return doctypeRepo.findAll();
	}

	public DoctypeEntity createNewDoctype(NewDoctype newDoctype) {
		DoctypeEntity doctype = new DoctypeEntity(newDoctype.getTitle());
		return doctypeRepo.save(doctype);
	}

	public DoctypeEntity updateDoctypeInfo(String title, NewDoctype newDoctype) {
		DoctypeEntity existingDoctype = findDoctypeByTitle(title);
		existingDoctype.setTitle(newDoctype.getTitle());
		return existingDoctype;
	}

	public void deleteDoctype(DoctypeEntity doctype) {
		doctypeRepo.delete(doctype);
	}

	@Transactional
	public void addGroupToDoctype(DoctypeEntity doctype, GroupEntity group) {
		doctype.addGroup(group);
		doctypeRepo.save(doctype);
	}

	@Transactional
	public void deleteGroupFromDoctype(GroupEntity group) {
		groupRepo.delete(group);
	}

}
