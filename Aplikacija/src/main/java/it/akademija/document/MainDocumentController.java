package it.akademija.document;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;



import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.doctype.DoctypeController;

@RestController
@Api(value = "document")
@RequestMapping(value = "/api/documents")
public class MainDocumentController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainDocumentController.class);

	private MainDocumentService mainDocService;

	@Autowired
	public MainDocumentController(MainDocumentService mainDocService) {
		this.mainDocService = mainDocService;
	}
	
	@PostMapping(value = "/upload")
	public ResponseEntity uploadToLocalFileSystem(@RequestParam("file") MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String fileBasePath = Paths.get(".").toAbsolutePath().toString();
		Path path = Paths.get(fileBasePath + fileName);
		try {
			Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			e.printStackTrace();
		}
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
				.path("/files/download/")
				.path(fileName)
				.toUriString();
		logger.debug("File ({}) was downloaded.", fileName);
		return ResponseEntity.ok(fileDownloadUri);
	}
	
	@PostMapping(value = "/multi-upload")
	public ResponseEntity multiUpload(@RequestParam("files") MultipartFile[] files) {
		List<Object> fileDownloadUrls = new ArrayList<>();
		Arrays.asList(files)
		.stream()
		.forEach(file -> fileDownloadUrls.add(uploadToLocalFileSystem(file).getBody()));
		logger.debug("File ({}) was downloaded.", files);
		return ResponseEntity.ok(fileDownloadUrls);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get documents", notes = "Returns all documents")
	public List<MainDocument> getDocuments() {
		return mainDocService.getMainDocuments();
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	@ApiOperation(value = "Find document by id", notes = "Returns document by id")
	public MainDocument getDocumentById(@ApiParam(value = "mainDocument id", required = true) @PathVariable Long id,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(id);
		if (document == null) {
			logger.debug("Document (ID{}) was not found.", document.getId());
			response.setStatus(404);
			return null;
		}
		logger.debug("Document (ID{}) was found.", document.getId());
		return mainDocService.findDocumentById(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Add new document", notes = "Returns new document")
	public MainDocument addNewDocument(@RequestBody final NewMainDocument newDocument, HttpServletResponse response) {
		return mainDocService.addDocument(newDocument);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update existing document", notes = "Returns document with new info")
	public MainDocument updateDocument(@PathVariable Long id, @RequestBody final NewMainDocument newDocument,
			HttpServletResponse response) {
		MainDocument document = mainDocService.findDocumentById(id);
		if (document == null) {
			logger.debug("Document (ID{}) failed to update.", document.getId());
			response.setStatus(404);
			return null;
		}
		logger.debug("Document (ID{}) was updated.", document.getId());
		return mainDocService.updateDocument(id, newDocument);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	@ApiOperation(value = "Delete document", notes = "Deletes document by id")
	public void deleteDocument(@PathVariable Long id) {
		logger.debug("Document was deleted.");
		mainDocService.deleteDocument(id);
	}

}
