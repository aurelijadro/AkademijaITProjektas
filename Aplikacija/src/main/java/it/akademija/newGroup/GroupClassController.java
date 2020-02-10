package it.akademija.newGroup;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroupClassController {

	private GroupClassService groupService;

	@Autowired
	public GroupClassController(GroupClassService groupService) {
		this.groupService = groupService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<GroupClass> getAllGroups() {
		return groupService.getAllGroups();
	}
}
