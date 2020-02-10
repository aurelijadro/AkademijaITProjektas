package it.akademija.newGroup;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.doctype.Doctype;

@Service
public class GroupClassService {

	GroupClassRepository groupRepo;

	@Autowired
	public GroupClassService(GroupClassRepository groupRepo) {
		this.groupRepo = groupRepo;
	}
	
	@Transactional
	public List<GroupClass> getAllGroups() {
		return groupRepo.findAll();
	}
	
	@Transactional
	public GroupClass getGroupByTitle(String title) {
		return groupRepo.findGroupClassByTitle(title);
		
	}
	
	@Transactional
	public void addNewGroup(GroupClass group) {
		GroupClass newGroup = new GroupClass();
		newGroup.getTitle();
		groupRepo.save(newGroup);
	}
	
	@Transactional
	public void addDoctypeToGroup(GroupClass group, Doctype doctype) {
		GroupClass newGroup = groupRepo.findGroupClassByTitle(group.getTitle());
		newGroup.addDoctype(doctype);
		groupRepo.save(newGroup);
	}
	
	@Transactional
	public List<Doctype> getAllDoctypesByGroup(String title) {
		List<Doctype> doctypes = new ArrayList<Doctype>();
		return doctypes;
	}
	
	
	
	
	
}
