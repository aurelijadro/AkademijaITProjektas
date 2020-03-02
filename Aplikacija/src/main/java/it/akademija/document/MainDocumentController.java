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
import it.akademija.doctype.DoctypeEntityRepo;
import it.akademija.filesCRUD.FileService;

@RestController
@Api(value = "document")
@RequestMapping(value = "/api/documents")
public class MainDocumentController {

	private static final Logger logger = LoggerFactory.getLogger(MainDocumentController.class);

	@Autowired
	private MainDocumentService mainDocService;

	@Autowired
	private DoctypeEntityRepo doctypeRepo;

	@Autowired
	private FileService fileService;

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

	@RequestMapping(path = "/{userId}/{doctypeId}", method = RequestMethod.POST)
	@ApiOperation(value = "Add new document", notes = "Returns new document")
	public MainDocument createDocument(@PathVariable Long userId, @PathVariable Long doctypeId,
			@RequestBody final NewMainDocument newDocument, HttpServletResponse response) {
		return mainDocService.addDocument(newDocument, userId, doctypeId);
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
	public void deleteDocument(@PathVariable Long documentId, @PathVariable Long userId, HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(documentId);
		if (document == null) {
			response.setStatus(404);
			return;
		}
		logger.debug("Document was deleted.");

		mainDocService.deleteDocument(documentId, userId);
		fileService.deleteAllFilesFromFolder(userId, documentId);
		response.setStatus(200);
	}

//	@RequestMapping(path = "/{documentId}/doctypes/{doctypeId}", method = RequestMethod.POST)
//	@ApiOperation(value = "Adds doctype to document", notes = "Adds doctype by id to document by its id")
//	public void addDoctypeByIdToDocument(@PathVariable Long documentId, @PathVariable Long doctypeId,
//			HttpServletResponse response) {
//		MainDocument document = mainDocService.findDocumentById(documentId);
//		if (document == null) {
//			response.setStatus(404);
//			return;
//		} else {
//			DoctypeEntity doctype = doctypeRepo.findDoctypeById(doctypeId);
//			if (doctype == null) {
//				response.setStatus(404);
//				return;
//			} else {
//				response.setStatus(200);
//				mainDocService.addDoctypeToDocument(document, doctype);
//			}
//		}
//	}

	@RequestMapping(path = "{userId}/{documentId}/submittedStatusUpdate", method = RequestMethod.POST)
	@ApiOperation(value = "Changes document status", notes = "Changes status from created to submitted")
	public void updateDocumentStatusToSubmitted(@PathVariable Long userId, @PathVariable Long documentId,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(documentId);
		if (document == null) {
			response.setStatus(404);
			return;
		}
		mainDocService.changeDocumentToSubmitted(userId, document);
	}

	@RequestMapping(path = "{approverId}/{documentId}/approvedStatusUpdate", method = RequestMethod.POST)
	@ApiOperation(value = "Changes document status", notes = "Changes status from created to submitted")
	public void updateDocumentStatusToApproved(@PathVariable Long approverId, @PathVariable Long documentId,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(documentId);
		if (document == null) {
			response.setStatus(404);
			return;
		}
		mainDocService.changeDocumentToApproved(approverId, document);
	}

	@RequestMapping(path = "{approverId}/{documentId}/rejectedStatusUpdate", method = RequestMethod.POST)
	@ApiOperation(value = "Changes document status", notes = "Changes status from created to submitted")
	public void updateDocumentStatusToDenied(@PathVariable Long approverId, @PathVariable Long documentId,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(documentId);
		if (document == null) {
			response.setStatus(404);
			return;
		}
		mainDocService.changeDocumentToDenied(approverId, document);
	}

	@RequestMapping(path = "/{id}/createdDocuments", method = RequestMethod.GET)
	@ApiOperation(value = "Get documents", notes = "Returns all documents")
	public List<MainDocument> getCreatedDocuments(@PathVariable Long id, HttpServletResponse response) {
		List<MainDocument> documentList = mainDocService.createdDocumentsList(id);
		if (documentList == null) {
			response.setStatus(404);
			return null;
		}
		return documentList;
	}

	@RequestMapping(path = "/{id}/submittedDocuments", method = RequestMethod.GET)
	@ApiOperation(value = "Get documents", notes = "Returns all documents")
	public List<MainDocument> getSubmittedDocuments(@PathVariable Long id, HttpServletResponse response) {
		List<MainDocument> documentList = mainDocService.submittedDocumentsList(id);
		if (documentList == null) {
			response.setStatus(404);
			return null;
		}
		return documentList;
	}
}
