package it.akademija.group;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.doctype.DoctypeEntityRepo;
import it.akademija.user.User;
import it.akademija.user.UserRepository;

@RestController
@RequestMapping("api/groups")
public class GroupEntityController {
	
	private static final Logger logger = LoggerFactory.getLogger(GroupEntityController.class);

	@Autowired
	private GroupService groupService;

	@Autowired
	private DoctypeEntityRepo doctypeRepo;

	@Autowired
	private UserRepository userRepo;

	@PostMapping()
	public GroupEntity createGroup(@RequestBody NewGroup newGroup, HttpServletResponse response) {
		if (groupService.findGroupByTitle(newGroup.getTitle()) == null) {
			response.setStatus(200);
			logger.debug("Initiated by [{}]: New group [{}] was  created",
					SecurityContextHolder.getContext().getAuthentication().getName(), newGroup.getTitle());
			return groupService.createNewGroup(newGroup);
		}
		response.setStatus(404);
		return null;
	}

	@GetMapping("/{title}")
	public GroupEntity getGroupByTitle(@PathVariable String title, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return group;
	}

	@GetMapping()
	public List<GroupEntity> getGroups() {
		return groupService.getAllGroups();
	}

	@PutMapping("/{title}")
	public GroupEntity updateGroup(@PathVariable String title, @RequestBody NewGroup group,
			HttpServletResponse response) {
		GroupEntity someGroup = groupService.findGroupByTitle(title);
		if (someGroup == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		logger.debug("Initiated by [{}]: Group [{}] was  updated",
				SecurityContextHolder.getContext().getAuthentication().getName(), someGroup.getTitle());
		return someGroup;
	}

	@DeleteMapping("/{title}")
	public void deleteGroup(@PathVariable String title, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return;
		}
		response.setStatus(200);
		logger.debug("Initiated by [{}]: Group [{}] was  deleted",
				SecurityContextHolder.getContext().getAuthentication().getName(), group.getTitle());
		groupService.deleteGroup(group);
	}

	@GetMapping("/{title}/doctypes")
	public Set<DoctypeEntity> getDoctypesByGroupTitle(@PathVariable String title, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return group.getDoctypes();
	}

	@PostMapping("/{title}/doctypes/{doctypeTitle}") // gali neveikti.
	public void addDoctypeByTitleToGroup(@PathVariable String title, String doctypeTitle,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeByTitle(doctypeTitle);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: Doctype [{}] was added to the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getTitle(), group.getTitle());
				groupService.addDoctypeToGroup(group, doctype);
			}
		}
	}

	@DeleteMapping("/{title}/doctypes/{doctypeTitle}") // pasitikrinti.
	public void deleteDoctypeByTitleFromGroup(@PathVariable String title, String doctypeTitle,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeByTitle(doctypeTitle);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: Doctype [{}] was deleted from the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getTitle(), group.getTitle());
				groupService.deleteDoctypeFromGroup(doctype);
			}
		}

	}

	@GetMapping("/{title}/users")
	public Set<User> getUsersInGroupByGroupTitle(@PathVariable String title, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return null;
		} else {
			return group.getUsers();
		}
	}

	@PostMapping("/{title}/users/{username}")
	public void addUserByUsernameToGroup(@PathVariable String title, String username, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			User user = userRepo.findByUsername(username);
			if (user == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: User [{}] was added to the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), username, group.getTitle());
				groupService.addUserToGroup(group, user);
			}
		}
	}

	@DeleteMapping("/{title}/users/{username}")
	public void deleteUserByUsernameFromGroup(@PathVariable String title, String username,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupByTitle(title);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			User user = userRepo.findByUsername(username);
			if (user == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: User [{}] was deleted from the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), username, group.getTitle());
				groupService.removeUserFromGroup(group, user);
			}
		}
	}
}