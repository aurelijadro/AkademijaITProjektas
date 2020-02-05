package it.akademija.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "group")
@RequestMapping(value = "/api/groups")
public class GroupController {
	
	private GroupService groupService;

	@Autowired
	public GroupController(GroupService groupService) {
		super();
		this.groupService = groupService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get groups", notes = "Returns all groups")
	public List<UsersGroup> getGroups() {
		return groupService.getGroups();
	}


}
