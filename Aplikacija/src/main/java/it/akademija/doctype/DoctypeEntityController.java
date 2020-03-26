package it.akademija.doctype;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.document.MainDocument;
import it.akademija.document.MainDocumentService;
import it.akademija.group.GroupEntity;

@RestController
@RequestMapping("api/doctypes")
public class DoctypeEntityController {

	private static final Logger logger = LoggerFactory.getLogger(DoctypeEntityController.class);

	@Autowired
	private DoctypeService doctypeService;

	@Autowired
	private MainDocumentService documentService;

	@Secured({ "ROLE_ADMIN" })
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

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@GetMapping()
	public List<DoctypeEntity> getDoctypes() {
		return doctypeService.getAllDoctypes();
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@GetMapping("/{id}")
	public DoctypeEntity getDoctypeById(@PathVariable Long id, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeById(id);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return doctype;
	}

	@Secured({ "ROLE_ADMIN" })
	@PutMapping("/{id}")
	public DoctypeEntity updateDoctype(@Valid @PathVariable Long id, @RequestBody NewDoctype newDoctype,
			HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.updateDoctypeInfo(id, newDoctype);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		logger.debug("Initiated by [{}]: Doctype with ID [{}] was  updated",
				SecurityContextHolder.getContext().getAuthentication().getName(), doctype.getId());
		return doctype;
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/creatingGroups")
	public Set<GroupEntity> getCreatingGroupsByDoctypeId(@PathVariable Long id, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeById(id);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return doctype.getCreatingGroups();
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/moderatingGroups")
	public Set<GroupEntity> getModeratingGroupsByDoctypeId(@PathVariable Long id, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeById(id);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return doctype.getModeratingGroups();
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/notDoctypeCreatingGroups")
	public Set<GroupEntity> getNotDoctypeCreatingGroups(@PathVariable Long id, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeById(id);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		} else {
			response.setStatus(200);
			Set<GroupEntity> notDoctypeGroups = doctypeService.getNonDoctypeCreatingGroups(doctype);
			return notDoctypeGroups;
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@GetMapping("/{id}/notDoctypeModeratingGroups")
	public Set<GroupEntity> getNotDoctypeModeratingGroups(@PathVariable Long id, HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeById(id);
		if (doctype == null) {
			response.setStatus(404);
			return null;
		} else {
			response.setStatus(200);
			Set<GroupEntity> notDoctypeGroups = doctypeService.getNonDoctypeModeratingGroups(doctype);
			return notDoctypeGroups;
		}
	}

	@Secured({ "ROLE_USER" })
	@PostMapping("/{doctypeId}/documents/{documentId}")
	public void addDocumentByIdToDoctype(@PathVariable Long doctypeId, @PathVariable Long documentId,
			HttpServletResponse response) {
		DoctypeEntity doctype = doctypeService.findDoctypeById(doctypeId);
		if (doctype == null) {
			response.setStatus(404);
			return;
		} else {
			MainDocument document = documentService.findDocumentById(documentId);
			if (document == null) {
				response.setStatus(404);
				return;
			} else {
				doctypeService.addDoctypeToDocuments(doctype, document);
			}
		}
	}

}
