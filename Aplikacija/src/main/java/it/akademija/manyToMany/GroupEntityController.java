package it.akademija.manyToMany;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.manyToMany2.DoctypeEntity;
import it.akademija.manyToMany2.DoctypeEntityRepo;
import it.akademija.manyToMany2.ResourceNotFoundException;

@RestController
@RequestMapping("api/groups")
public class GroupEntityController {

	@Autowired
	private GroupEntityRepo groupRepo;

	@Autowired
	private DoctypeEntityRepo doctypeRepo;

	@PostMapping() // Validates the request body as a Student type
	public GroupEntity createGroup(@Valid @RequestBody GroupEntity group) {
		// Saves and return the new student
		return this.groupRepo.save(group);
	}

	@GetMapping("/{id}") // Finds a student by id (the variable must be wrapped by "{}" and match the
							// @PathVariable name
	public GroupEntity getGroupById(@PathVariable Long id) {
		// If the record exists by id return it, otherwise throw an exception
		return this.groupRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Group", id));
	}

	@GetMapping()
	public List<GroupEntity> getGroups() {
		return this.groupRepo.findAll();
	}

	@PutMapping()
	public GroupEntity updateGroup(@Valid @RequestBody GroupEntity group) {
		return this.groupRepo.findById(group.getId()).map((toUpdate) -> {
			toUpdate.setTitle(group.getTitle());
			return this.groupRepo.save(toUpdate);
		}).orElseThrow(() -> new ResourceNotFoundException("Group", group.getId()));
	}

	@DeleteMapping("/{id}") // Find student by id
	public ResponseEntity deleteGroup(@PathVariable Long id) {
		// If id exists, delete the record and return a response message, otherwise
		// throws exception
		return this.groupRepo.findById(id).map((toDelete) -> {
			this.groupRepo.delete(toDelete);
			return ResponseEntity.ok("Group id " + id + " deleted");
		}).orElseThrow(() -> new ResourceNotFoundException("Group", id));
	}

	@GetMapping("/{id}/doctypes")
	public Set<DoctypeEntity> getDoctypes(@PathVariable Long id) {
		return this.groupRepo.findById(id).map((group) -> {
			return group.getDoctypes();
		}).orElseThrow(() -> new ResourceNotFoundException("Group", id));
	}

	@PostMapping("/{id}/doctypes")
	public void addDoctypeByTitleToGroup(@PathVariable Long id, String title) throws Exception {
		Optional<GroupEntity> maybeGroup = groupRepo.findById(id);
		if (maybeGroup.isPresent()) {
			GroupEntity group = maybeGroup.get();

			DoctypeEntity doctype = doctypeRepo.findDoctypeByTitle(title);
			if (doctype == null) {
				throw new NullPointerException("Doctype doesn't exist.");
			}

			group.addDoctype(doctype);
			groupRepo.save(group);
		} else {
			throw new Exception("Group doesn't exist.");
		}

	}

}
