package it.akademija.doctype;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.group.GroupEntity;
import it.akademija.group.GroupService;

@RestController
@RequestMapping("api/doctypes")
public class DoctypeEntityController {

	@Autowired
	private DoctypeService doctypeService;

	@Autowired
	private GroupService groupService;

	@PostMapping()
	public DoctypeEntity createDoctype(@RequestBody NewDoctype doctype, HttpServletResponse response) {
		if (doctypeService.findDoctypeByTitle(doctype.getTitle()) == null) {
			response.setStatus(200);
			return doctypeService.createNewDoctype(doctype);
		}
		response.setStatus(404);
		return null;
	}

	@GetMapping()
	public List<DoctypeEntity> getDoctypes() {
		return this.doctypeService.getAllDoctypes();
	}

	@GetMapping("/{title}")
	public DoctypeEntity getDoctypeByTitle(@PathVariable String title, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeByTitle(title);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		return doctype;
	}

	@PutMapping("/{title}")
	public DoctypeEntity updateDoctype(@Valid @PathVariable String title, @RequestBody NewDoctype newDoctype,
			HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.updateDoctypeInfo(title, newDoctype);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		return doctype;
	}

//	@DeleteMapping("/{id}")
//	public ResponseEntity deleteDoctype(@PathVariable Long id) {
//		return this.doctypeRepo.findById(id).map((toDelete) -> {
//			this.doctypeRepo.delete(toDelete);
//			return ResponseEntity.ok("Doctype id " + id + " deleted");
//		}).orElseThrow(() -> new ResourceNotFoundException("Doctype", id));
//	}

	@GetMapping("/{title}/groups")
	public Set<GroupEntity> getGroupsByDoctypeTitle(@PathVariable String title, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeByTitle(title);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		return doctype.getGroups();
	}

}
