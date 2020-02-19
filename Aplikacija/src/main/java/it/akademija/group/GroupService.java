package it.akademija.group;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.doctype.DoctypeEntityRepo;
import it.akademija.user.User;
import it.akademija.user.UserRepository;

@Service
public class GroupService {

	@Autowired
	GroupEntityRepo groupRepo;

	@Autowired
	DoctypeEntityRepo doctypeRepo;

	@Autowired
	UserRepository userRepo;

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
	public GroupEntity updateGroupInfo(String title, NewGroup newGroup) {
		GroupEntity existingGroup = findGroupByTitle(title);
		existingGroup.setTitle(newGroup.getTitle());

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

	@Transactional
	public void addUserToGroup(GroupEntity group, User user) {
		group.addUser(user);
		groupRepo.save(group);
	}

	@Transactional
	public void removeUserFromGroup(GroupEntity group, User user) {
		group.removeUser(user);
		groupRepo.save(group);
	}

	@Transactional
	public void deleteGroup(GroupEntity group) {
		groupRepo.delete(group);
	}

	@Transactional
	public Set<GroupEntity> getGroupsUserDoesntBelongTo(User user) {
		Set<GroupEntity> userGroups = user.getGroups();

		Set<GroupEntity> allGroups = new HashSet<GroupEntity>();
		allGroups.addAll(groupRepo.findAll());

		allGroups.removeAll(userGroups);
		return allGroups;
	}

	@Transactional
	public Set<User> getUsersNotInGroup(GroupEntity group) {
		Set<User> GroupUsers = group.getUsers();

		Set<User> allUsers = new HashSet<User>();
		allUsers.addAll(userRepo.findAll());
		allUsers.removeAll(GroupUsers);
		return allUsers;
	}

}
