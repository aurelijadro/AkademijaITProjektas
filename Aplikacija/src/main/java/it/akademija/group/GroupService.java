package it.akademija.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.doctype.DoctypeEntityRepo;

@Service
public class GroupService {

	@Autowired
	GroupEntityRepo groupRepo;

	@Autowired
	DoctypeEntityRepo doctypeRepo;

	@Transactional
	public List<GroupEntity> getAllGroups() {
		return groupRepo.findAll();
	}

	@Transactional
	public GroupEntity createNewGroup(NewGroup newGroup) {
		GroupEntity group = new GroupEntity(newGroup.getTitle());
		return groupRepo.save(group);
	}

	@Transactional
	public GroupEntity findGroupById(Long id) {
		return groupRepo.findGroupEntityById(id);
	}

	@Transactional
	public GroupEntity findGroupByTitle(String title) {
		return groupRepo.findGroupEntityByTitle(title);
	}

	@Transactional
	public GroupEntity updateGroupInfo(String title, NewGroup group) {
		GroupEntity existingGroup = findGroupByTitle(title);
		existingGroup.setTitle(group.getTitle());

		return existingGroup;
	}

	@Transactional
	public void addDoctypeToGroup(GroupEntity group, DoctypeEntity doctype) {
		group.addDoctype(doctype);
		groupRepo.save(group);
	}

	@Transactional
	public void deleteDoctypeFromGroup(DoctypeEntity doctype) {
		doctypeRepo.delete(doctype);
	}

}
