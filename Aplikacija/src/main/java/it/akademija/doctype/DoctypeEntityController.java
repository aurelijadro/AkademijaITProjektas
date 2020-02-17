package it.akademija.doctype;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

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

import it.akademija.group.GroupEntity;

@RestController
@RequestMapping("api/doctypes")
public class DoctypeEntityController {
	
	private static final Logger logger = LoggerFactory.getLogger(DoctypeEntityController.class);

	@Autowired
	private DoctypeService doctypeService;

	@PostMapping()
	public DoctypeEntity createDoctype(@RequestBody NewDoctype doctype, HttpServletResponse response) {
		if (doctypeService.findDoctypeByTitle(doctype.getTitle()) == null) {
			response.setStatus(200);
			logger.debug("Initiated by [{}]: New doctype with ID [{}] was  created",
					SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getTitle());
			return doctypeService.createNewDoctype(doctype);
		}
		response.setStatus(404);
		return null;
	}

	@GetMapping()
	public List<DoctypeEntity> getDoctypes() {
		return doctypeService.getAllDoctypes();
	}

	@GetMapping("/{title}")
	public DoctypeEntity getDoctypeByTitle(@PathVariable String title, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeByTitle(title);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
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
		response.setStatus(200);
		logger.debug("Initiated by [{}]: Doctype with ID [{}] was  updated",
				SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getId());
		return doctype;
	}

	@DeleteMapping("/{title}")
	public void deleteDoctype(@PathVariable String title, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeByTitle(title);
		if (doctype == null) {
			response.setStatus(404);
			return;
		}
		response.setStatus(200);
		logger.debug("Initiated by [{}]: Doctype with ID [{}] was  deleted",
				SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getId());
		doctypeService.deleteDoctype(doctype);
	}

	@GetMapping("/{title}/groups")
	public Set<GroupEntity> getGroupsByDoctypeTitle(@PathVariable String title, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeByTitle(title);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return doctype.getGroups();
	}

}
