package it.akademija.doctype;

import java.util.List;
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

import it.akademija.group.GroupEntity;
import it.akademija.group.GroupEntityRepo;

@RestController
@RequestMapping("api/doctypes")
public class DoctypeEntityController {

	@Autowired
	private DoctypeEntityRepo doctypeRepo;

	@Autowired
	private GroupEntityRepo groupRepo;

	@PostMapping() // Validates the request body as a Lecturer type
	public DoctypeEntity createDoctype(@Valid @RequestBody DoctypeEntity doctype) {
		// Saves and return the new lecturer
		return this.doctypeRepo.save(doctype);
	}

	@GetMapping()
	public List<DoctypeEntity> getDoctypes() {
		return this.doctypeRepo.findAll();
	}

	@GetMapping("/{id}") // Finds a lecturer by id (the variable must be wrapped by "{}" and match the
							// @PathVariable name
	public DoctypeEntity getDoctypeById(@PathVariable Long id) {
		// If the record exists by id return it, otherwise throw an exception
		return this.doctypeRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Doctype", id));
	}

	@PutMapping() // Validates the request body as a Lecturer type
	public DoctypeEntity updateDoctype(@Valid @RequestBody DoctypeEntity doctype) {
		// Finds lecturer by id, maps it's content, update new values and save. Throws
		// an exception if not found.
		return this.doctypeRepo.findById(doctype.getId()).map((toUpdate) -> {
			toUpdate.setTitle(doctype.getTitle());
			return this.doctypeRepo.save(toUpdate);
		}).orElseThrow(() -> new ResourceNotFoundException("Doctype", doctype.getId()));
	}

	@DeleteMapping("/{id}") // Finds lecturer by id
	public ResponseEntity deleteDoctype(@PathVariable Long id) {
		// If id exists, delete the record and return a response message, otherwise
		// throws exception
		return this.doctypeRepo.findById(id).map((toDelete) -> {
			this.doctypeRepo.delete(toDelete);
			return ResponseEntity.ok("Doctype id " + id + " deleted");
		}).orElseThrow(() -> new ResourceNotFoundException("Doctype", id));
	}

	@GetMapping("/{doctypeId}/groups")
	public Set<GroupEntity> getGroups(@PathVariable Long doctypeId) {
		// Finds lecturer by id and returns it's recorded students, otherwise throws
		// exception
		return this.doctypeRepo.findById(doctypeId).map((doctype) -> {
			return doctype.getGroups();
		}).orElseThrow(() -> new ResourceNotFoundException("Doctype", doctypeId));
	}

	@PostMapping("/{id}/groups/{groupId}") // Path variable names must match with method's signature variables.
	public Set<GroupEntity> addGroup(@PathVariable Long id, @PathVariable Long groupId) {
		// Finds a persisted student
		GroupEntity group = this.groupRepo.findById(groupId)
				.orElseThrow(() -> new ResourceNotFoundException("Group", groupId));

		// Finds a lecturer and adds the given student to the lecturer's set.
		return this.doctypeRepo.findById(id).map((doctype) -> {
			doctype.getGroups().add(group);
			return this.doctypeRepo.save(doctype).getGroups();
		}).orElseThrow(() -> new ResourceNotFoundException("Doctype", id));
	}
}
