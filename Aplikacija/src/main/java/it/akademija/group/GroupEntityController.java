package it.akademija.group;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
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

	@Secured({ "ROLE_ADMIN" })
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

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@GetMapping("/{id}")
	public GroupEntity getGroupById(@PathVariable Long id, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return group;
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping()
	public List<GroupEntity> getGroups() {
		return groupService.getAllGroups();
	}

	@Secured({ "ROLE_ADMIN" })
	@PutMapping("/{id}")
	public GroupEntity updateGroup(@PathVariable Long id, @RequestBody NewGroup group, HttpServletResponse response) {
		GroupEntity someGroup = groupService.findGroupById(id);
		if (someGroup == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return groupService.updateGroupInfo(id, group);
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@GetMapping("/{id}/doctypesToCreate")
	public Set<DoctypeEntity> getDoctypesToCreateByGroupId(@PathVariable Long id, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return group.getDoctypesToCreate();
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@GetMapping("/{id}/doctypesToModerate")
	public Set<DoctypeEntity> getDoctypesToModerateByGroupId(@PathVariable Long id, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return group.getDoctypesToModerate();
	}

	@Secured({ "ROLE_ADMIN" })
	@PostMapping("/{groupId}/doctypesToCreate/{doctypeId}")
	public void addDoctypeToCreateByIdToGroup(@PathVariable Long groupId, @PathVariable Long doctypeId,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(groupId);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeById(doctypeId);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: Doctype [{}] was added to the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getTitle(),
						group.getTitle());
				groupService.addDoctypeToCreateToGroup(group, doctype);
			}
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@PostMapping("/{groupId}/doctypesToModerate/{doctypeId}")
	public void addDoctypeToModerateByIdToGroup(@PathVariable Long groupId, @PathVariable Long doctypeId,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(groupId);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeById(doctypeId);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: Doctype [{}] was added to the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getTitle(),
						group.getTitle());
				groupService.addDoctypeToModerateToGroup(group, doctype);
			}
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@DeleteMapping("/{groupId}/doctypesToCreate/{doctypeId}")
	public void deleteDoctypeToCreateByIdFromGroup(@PathVariable Long groupId, @PathVariable Long doctypeId,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(groupId);
		if (group == null) {
			response.setStatus(403);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeById(doctypeId);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: Doctype [{}] was deleted from the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getTitle(),
						group.getTitle());
				groupService.removeDoctypeToCreateFromGroup(doctype, group);
			}
		}

	}

	@Secured({ "ROLE_ADMIN" })
	@DeleteMapping("/{groupId}/doctypesToModerate/{doctypeId}")
	public void deleteDoctypeToModerateByIdFromGroup(@PathVariable Long groupId, @PathVariable Long doctypeId,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(groupId);
		if (group == null) {
			response.setStatus(403);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeById(doctypeId);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: Doctype [{}] was deleted from the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getTitle(),
						group.getTitle());
				groupService.removeDoctypeToModerateFromGroup(doctype, group);
			}
		}

	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/users")
	public Set<User> getUsersInGroupByGroupId(@PathVariable Long id, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return null;
		} else {
			return group.getUsers();
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/usersnotingroup")
	public Set<User> getUsersNotInGroup(@PathVariable Long id, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return null;
		} else {
			response.setStatus(200);
			Set<User> notGroupUsers = groupService.getUsersNotInGroup(group);
			return notGroupUsers;
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@PostMapping("/{groupId}/users/{userId}")
	public void addUserByUserIdToGroup(@PathVariable Long groupId, @PathVariable Long userId,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(groupId);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			User user = userRepo.findUserById(userId);
			if (user == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: User [{}] was added to the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), userId, group.getTitle());
				groupService.addUserToGroup(group, user);
			}
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@DeleteMapping("/{groupId}/users/{userId}")
	public void deleteUserByUserIdFromGroup(@PathVariable Long groupId, @PathVariable Long userId,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(groupId);
		if (group == null) {
			response.setStatus(403);
			return;
		} else {
			User user = userRepo.findUserById(userId);
			if (user == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				logger.debug("Initiated by [{}]: User [{}] was deleted from the group [{}]",
						SecurityContextHolder.getContext().getAuthentication().getName(), userId, group.getTitle());
				groupService.removeUserFromGroup(group, user);
			}
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/userdoenstbelong/{userId}")
	public Set<GroupEntity> getGroupsUserDoesntBelongTo(@PathVariable Long userId, HttpServletResponse response) {
		User user = userRepo.findUserById(userId);
		if (user == null) {
			response.setStatus(404);
			return null;
		} else {
			response.setStatus(200);
			Set<GroupEntity> notUserGroups = groupService.getGroupsUserDoesntBelongTo(user);
			logger.debug(notUserGroups.toString());
			return notUserGroups;
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/notdoctypesToCreate")
	public Set<DoctypeEntity> getDoctypesToCreateNotInGroupByGroupId(@PathVariable Long id,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		Set<DoctypeEntity> notGroupDoctypes = groupService.getDoctypesToCreateGroupDoesntManage(group);
		return notGroupDoctypes;
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/notdoctypesToModerate")
	public Set<DoctypeEntity> getDoctypesToModerateNotInGroupByGroupId(@PathVariable Long id,
			HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		Set<DoctypeEntity> notGroupDoctypes = groupService.getDoctypesToModerateGroupDoesntManage(group);
		return notGroupDoctypes;
	}
}