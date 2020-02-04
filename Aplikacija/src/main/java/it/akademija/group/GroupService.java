package it.akademija.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GroupService {

	private GroupRepository groupRepository;

	@Autowired
	public GroupService(GroupRepository groupRepository) {
		super();
		this.groupRepository = groupRepository;
	}
	
	@Transactional
	public List<Group> getGroups(){
		return groupRepository.findAll();
	}
}
