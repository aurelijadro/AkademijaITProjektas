package it.akademija.document;

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
import it.akademija.doctype.DoctypeEntity;
import it.akademija.doctype.DoctypeService;

@RestController
@Api(value = "document")
@RequestMapping(value = "/api/documents")
public class MainDocumentController {

	private static final Logger logger = LoggerFactory.getLogger(MainDocumentController.class);

	@Autowired
	private MainDocumentService mainDocService;

	@Autowired
	private DoctypeService doctypeService;

	@RequestMapping(path = "/{id}/documents", method = RequestMethod.GET)
	@ApiOperation(value = "Get documents", notes = "Returns all documents")
	public List<MainDocument> getDocuments(@PathVariable Long id) {
		return mainDocService.getMainDocuments(id);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	@ApiOperation(value = "Find document by id", notes = "Returns document by id")
	public MainDocument getDocumentById(@ApiParam(value = "mainDocument id", required = true) @PathVariable Long id,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(id);
		if (document == null) {
			logger.debug("Document (ID{}) was not found.", id);
			response.setStatus(404);
			return null;
		}
		logger.debug("Document (ID{}) was found.", document.getId());
		return document;
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.POST)
	@ApiOperation(value = "Add new document", notes = "Returns new document")
	public MainDocument createDocument(@PathVariable Long id, @RequestBody final NewMainDocument newDocument,
			HttpServletResponse response) {
		return mainDocService.addDocument(newDocument, id);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update existing document", notes = "Returns document with new info")
	public MainDocument updateDocument(@PathVariable Long id, @RequestBody final NewMainDocument newDocument,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(id);
		if (document == null) {
			logger.debug("Document (ID{}) failed to update.", id);
			response.setStatus(404);
			return null;
		}
		logger.debug("Document (ID{}) was updated.", document.getId());
		response.setStatus(200);
		return mainDocService.updateDocument(id, newDocument);
	}

	@RequestMapping(path = "{userId}/{documentId}", method = RequestMethod.DELETE)
	@ApiOperation(value = "Delete document", notes = "Deletes document by id")
	public void deleteDocument(@PathVariable Long documentId, Long userId, HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(documentId);
		if (document == null) {
			response.setStatus(404);
			return;
		}
		logger.debug("Document was deleted.");
		response.setStatus(200);
		mainDocService.deleteDocument(documentId, userId);
	}

	@RequestMapping(path = "/{documentId}/doctypes/{doctypeId}", method = RequestMethod.POST)
	@ApiOperation(value = "Adds doctype to document", notes = "Adds doctype by id to document by its id")
	public void addDoctypeByIdToDocument(@PathVariable Long documentId, Long doctypeId, HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(documentId);
		if (document == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity doctype = doctypeService.findDoctypeById(documentId);
			if (doctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				mainDocService.addDoctypeToDocument(document, doctype);
			}
		}
	}

	@RequestMapping(path = "/{documentId}/doctypes/{doctypeId}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update doctype for document", notes = "Updates doctype by id for document")
	public void updateDoctypeTitleInDocument(@PathVariable Long documentId, Long doctypeId,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(documentId);
		if (document == null) {
			response.setStatus(404);
			return;
		} else {
			DoctypeEntity newDoctype = doctypeService.findDoctypeById(doctypeId);
			if (newDoctype == null) {
				response.setStatus(404);
				return;
			} else {
				response.setStatus(200);
				mainDocService.updateDoctypeInDocument(document, newDoctype);
			}
		}
	}

//	@PostMapping(value = "/upload")
//	public ResponseEntity uploadToLocalFileSystem(@RequestParam("file") MultipartFile file) {
//		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//		String fileBasePath = Paths.get(".").toAbsolutePath().toString();
//		Path path = Paths.get(fileBasePath + fileName);
//		try {
//			Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/files/download/")
//				.path(fileName).toUriString();
//		logger.debug("File ({}) was downloaded.", fileName);
//		return ResponseEntity.ok(fileDownloadUri);
//	}
//
//	@PostMapping(value = "/multi-upload")
//	public ResponseEntity multiUpload(@RequestParam("files") MultipartFile[] files) {
//		List<Object> fileDownloadUrls = new ArrayList<>();
//		Arrays.asList(files).stream().forEach(file -> fileDownloadUrls.add(uploadToLocalFileSystem(file).getBody()));
//		logger.debug("File ({}) was downloaded.", files);
//		return ResponseEntity.ok(fileDownloadUrls);
//	}

}
