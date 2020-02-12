package it.akademija.group;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@RequestMapping("api/groups")
public class GroupEntityController {

	@Autowired
	private GroupService groupService;

	@Autowired
	private DoctypeEntityRepo doctypeRepo;

	@PostMapping()
	public GroupEntity createGroup(@RequestBody NewGroup newGroup, HttpServletResponse response) {
		if (groupService.findGroupByTitle(newGroup.getTitle()) == null) {
			response.setStatus(200);
			return this.groupService.createNewGroup(newGroup);
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
		return this.groupService.findGroupByTitle(title);
	}

	@GetMapping()
	public List<GroupEntity> getGroups() {
		return this.groupService.getAllGroups();
	}

	@PutMapping("/{title}")
	public GroupEntity updateGroup(@PathVariable String title, @RequestBody NewGroup group,
			HttpServletResponse response) {
		GroupEntity someGroup = groupService.findGroupByTitle(title);
		if (someGroup == null) {
			response.setStatus(404);
			return null;
		}
		return this.groupService.updateGroupInfo(title, group);
	}

//	@DeleteMapping("/{id}")
//	public ResponseEntity deleteGroup(@PathVariable Long id) {
//		return this.groupRepo.findById(id).map((toDelete) -> {
//			this.groupRepo.delete(toDelete);
//			return ResponseEntity.ok("Group id " + id + " deleted");
//		}).orElseThrow(() -> new ResourceNotFoundException("Group", id));
//	}

	@GetMapping("/{title}/doctypes")
	public Set<DoctypeEntity> getDoctypesByGroupTitle(@PathVariable String title) {
		GroupEntity group = groupService.findGroupByTitle(title);
		return group.getDoctypes();
	}

	@PostMapping("/{id}/doctypes")
	public void addDoctypeByTitleToGroup(@PathVariable Long id, String title, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeByTitle(title);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				groupService.addDoctypeToGroup(group, doctype);
			}
		}
	}

	@DeleteMapping("/{id}/doctypes")
	public void deleteDoctypeByTitleFromGroup(@PathVariable Long id, String title, HttpServletResponse response) {
		GroupEntity group = groupService.findGroupById(id);
		if (group == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity doctype = doctypeRepo.findDoctypeByTitle(title);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				groupService.deleteDoctypeFromGroup(doctype);
			}
		}

	}
}