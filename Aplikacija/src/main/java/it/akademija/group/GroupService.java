//package it.akademija.group;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import it.akademija.doctype.Doctype;
//import it.akademija.doctype.DoctypeRepository;
//
//@Service
//public class GroupService {
//	
//	private DoctypeRepository doctypeRepository;
//
//	private GroupRepository groupRepository;
//
//	@Autowired
//	public GroupService(GroupRepository groupRepository, DoctypeRepository doctypeRepository) {
//		this.groupRepository = groupRepository;
//		this.doctypeRepository = doctypeRepository;
//	}
//	
//	@Transactional
//	public List<GroupDTO> getAllGroups(){
//		List<UsersGroup> groups = groupRepository.findAll();
//		List<GroupDTO> groupsToShow = new ArrayList<GroupDTO>();
//		for (int i = 0; i < groups.size(); i++) {
//			groupsToShow.add(new GroupDTO(groups.get(i)));
//		}
//		return groupsToShow;
//	}
//	
//	@Transactional
//	public GroupDTO findByTitle(String title) {
//		UsersGroup group = groupRepository.findUsersGroupByTitle(title);
//		GroupDTO groupToShow = new GroupDTO(group);
//		return groupToShow;
//	}
//	
//	@Transactional
//	public UsersGroup addNewGroup(GroupDTO groupDTO) {
//		UsersGroup group = new UsersGroup();
//		UsersGroup groupToAdd = new GroupDTO(group);
//		groupToAdd.setTitle(groupDTO.getTitle());
//		groupToAdd.setDoctypeListArray(new ArrayList<Doctype>());
//		groupRepository.save(groupToAdd);
//		return groupToAdd;
//	}
//	
////	@Transactional
////	public List<Doctype> getDoctypesForGroup(String title) {
////		UsersGroup group = findByTitle(title);
////			if(group != null) {
////				return group.getDoctypes().stream().map((doctype) -> new Doctype(doctype.getId(), doctype.getTitle())).collect(Collectors.toList());
////			}
////		return null;
////	}
////	
////	@Transactional
////	public void addDoctypeToGroup(Doctype doctype, String groupTitle) {
////		UsersGroup group = findByTitle(groupTitle);
////		Doctype newDoctype = doctypeRepository.findDoctypeById(doctype.getId());
////		
////		if(group == null) {
////			group = new UsersGroup(groupTitle); 
////		}
////		
////		if(newDoctype != null) {
////			group.addDoctypeToGroup(newDoctype);
////			newDoctype.addGroup(group);
////			doctypeRepository.save(newDoctype);
////		}
////	}
//	
////	@Transactional
////	public void deleteDoctype(String groupTitle, Long doctypeId) {
////		UsersGroup group = findByTitle(groupTitle);
////		Doctype doctype = doctypeRepository.findById(doctypeId).get();
////
////		group.getDoctypes().remove(doctype);
////		doctype.getGroups().remove(group);
////
////		groupRepository.save(group);
////		doctypeRepository.save(doctype);
////	}
//	
//
//	
//
//	
////	@Transactional
////	public UsersGroup updateGroupInfo(String title, GroupDTO groupDTO) {
////		UsersGroup existingGroup = findByTitle(title);
////		existingGroup.setTitle(groupDTO.getTitle());
////		existingGroup.setDoctypes(groupDTO.getDoctypeListArray());
////		return existingGroup;
////	}
//	
//}
