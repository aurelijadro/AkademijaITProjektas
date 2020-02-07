package it.akademija.group;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.doctype.Doctype;
import it.akademija.doctype.DoctypeRepository;

@Service
public class GroupService {
	
	private DoctypeRepository doctypeRepository;

	private GroupRepository groupRepository;

	@Autowired
	public GroupService(GroupRepository groupRepository, DoctypeRepository doctypeRepository) {
		this.groupRepository = groupRepository;
		this.doctypeRepository = doctypeRepository;
	}
	
	@Transactional
	public List<UsersGroup> getGroups(){
		return groupRepository.findAll();
	}
	
	@Transactional
	public List<Doctype> getDoctypesForGroup(String title) {
		UsersGroup group = findByTitle(title);
			if(group != null) {
				return group.getDoctypes().stream().map((doctype) -> new Doctype(doctype.getId(), doctype.getTitle())).collect(Collectors.toList());
			}
		return null;
	}
	
	@Transactional
	public void addDoctypeToGroup(Doctype doctype, String groupTitle) {
		UsersGroup group = findByTitle(groupTitle);
		Doctype newDoctype = doctypeRepository.findDoctypeById(doctype.getId());
		
		if(group == null) {
			group = new UsersGroup(groupTitle); // abejoju del sito.
		}
		
		if(newDoctype != null) {
			group.addDoctypeToGroup(newDoctype);
			newDoctype.addGroup(group);
			doctypeRepository.save(newDoctype);
		}
	}
	
	@Transactional
	public void deleteDoctype(String groupTitle, Long doctypeId) {
		UsersGroup group = findByTitle(groupTitle);
		Doctype doctype = doctypeRepository.findById(doctypeId).get();

		group.getDoctypes().remove(doctype);
		doctype.getGroups().remove(group);

		groupRepository.save(group);
		doctypeRepository.save(doctype);
	}
	
	@Transactional
	public UsersGroup findByTitle(String title) {
		return groupRepository.findUsersGroupByTitle(title);
	}
	
	@Transactional
	public UsersGroup addNewGroup(NewGroup newGroup) {
		UsersGroup group = new UsersGroup(newGroup.getTitle(), newGroup.getDoctypes());
		return groupRepository.save(group);
	}
	
	@Transactional
	public UsersGroup updateGroupInfo(String title, NewGroup newGroup) {
		UsersGroup existingGroup = findByTitle(title);
		existingGroup.setTitle(newGroup.getTitle());
		existingGroup.setDoctypes(newGroup.getDoctypes());
		return existingGroup;
	}
	
}
