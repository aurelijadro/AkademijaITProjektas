package it.akademija.group;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.doctype.Doctype;
import it.akademija.user.NewUser;
import it.akademija.user.User;

@RestController
@Api(value = "group")
@RequestMapping(value = "/api/groups")
public class GroupController {
	
	private static final Logger logger = LoggerFactory.getLogger(GroupController.class);
	
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

	@RequestMapping(path = "/groupByTitle/{title}", method = RequestMethod.GET)
	@ApiOperation(value = "Find group by title", notes = "Returns group by title")
	public UsersGroup getGroupByTitle(@ApiParam(value = "usersGroup title", required = true) @PathVariable String title,
			HttpServletResponse response) {
		UsersGroup group = groupService.findByTitle(title);
		if (group == null) {
			logger.debug("Group ({}) was not found.", group.getTitle() );
			response.setStatus(404);
			return null;
		}
		logger.debug("Group (${}) was found.", group.getTitle() );
		return groupService.findByTitle(title);
	}
	
	@RequestMapping(path = "/groupDoctype/{title}", method = RequestMethod.GET)
	@ApiOperation(value = "Find list of doctypes for group", notes = "Returns group with doctypes list")
	public List<Doctype> getDoctypesByGroup(@ApiParam(value = "usersGroup title", required = true) @PathVariable String title,
			HttpServletResponse response) {
		UsersGroup group = groupService.findByTitle(title);
		if (group == null) {
			logger.debug("Group ({}) was not found.", group.getTitle() );
			response.setStatus(404);
			return null;
		}
		logger.debug("Group (${}) was found.", group.getTitle() );
		return groupService.getDoctypesForGroup(title);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Add new group", notes = "Returns new group")
	public UsersGroup addNewGroup(@RequestBody final NewGroup newGroup, HttpServletResponse response) {
		if (groupService.findByTitle(newGroup.getTitle()) == null) {
			response.setStatus(200);
			logger.debug("New group ({}) was created.", newGroup.getTitle() );
			return groupService.addNewGroup(newGroup);
		}
		response.setStatus(404);
		logger.debug("Failed to create new group ({}).", newGroup.getTitle() );
		return null;

	}

	@RequestMapping(path = "/{title}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update existing group info", notes = "Returns group with new info")
	public UsersGroup updateGroup(@PathVariable String title, @RequestBody final NewGroup newGroup,
			HttpServletResponse response) {
		UsersGroup group = groupService.findByTitle(title);
		if (group == null) {
			logger.debug("Group ({}) was not found.", group.getTitle() );
			response.setStatus(404);
			return null;
		}
		logger.debug("New group ({}) was updated.", group.getTitle() );
		return groupService.updateGroupInfo(title, newGroup);
	}

	
}
