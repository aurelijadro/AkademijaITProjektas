package it.akademija.filesCRUD;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import it.akademija.document.MainDocument;
import it.akademija.document.MainDocumentService;
import it.akademija.user.User;
import it.akademija.user.UserRepository;
import it.akademija.user.UserService;

@RestController
@RequestMapping("api/files")
public class FileController {

	@Autowired
	FileService fileService;

	@Autowired
	UserService userService;

	@Autowired
	MainDocumentService docService;

	@Autowired
	UserRepository userRepository;

	@PostMapping("{userId}/{documentId}/uploadFile")
	public File uploadFile(@PathVariable Long userId, @PathVariable Long documentId, @RequestParam MultipartFile file)
			throws IOException {

//		MainDocument document = docService.findDocumentById(documentId);
		String fileName = fileService.storeUploadedFile(file, userId, documentId);

		if (fileName.isEmpty()) {
			return null;
		} else {

			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
					.path(fileName).toUriString();

			return new File(fileName, fileDownloadUri);
		}
	}

	@GetMapping("{userId}/{documentId}/uploadedFilesNames")
	public List<String> getListOfFiles(@PathVariable Long userId, @PathVariable Long documentId) throws IOException {
		return fileService.getUploadedFilesNames(userId, documentId);
	}

	@GetMapping("{userId}/{documentId}/uploadedFilesData")
	public List<FileDTO> getListOfFilesData(@PathVariable Long userId, @PathVariable Long documentId)
			throws IOException {

		return fileService.getUploadedFilesData(userId, documentId);
	}

	@DeleteMapping("{userId}/{documentId}/delete")
	public void deleteDocumentFolder(@PathVariable Long userId, @PathVariable Long documentId) throws IOException {
		fileService.deleteDocumentFolder(userId, documentId);
	}

	@DeleteMapping("{userId}/{documentId}/documentsDelete")
	public void deleteFilesInFolder(@PathVariable Long userId, @PathVariable Long documentId) throws IOException {
		fileService.deleteFilesInFolder(userId, documentId);
	}

	@GetMapping("{userId}/{documentId}/downloadZip")
	public void downloadZipFromDocumentById(@PathVariable Long userId, @PathVariable Long documentId,
			HttpServletResponse response) throws Exception {
		User user = userRepository.findUserById(userId);
		if (user == null) {
			response.setStatus(404);
		} else {
			MainDocument document = docService.findDocumentById(documentId);
			if (document == null) {
				response.setStatus(404);
			} else {
				fileService.downloadFile(userId, documentId, response);
			}
		}

	}

	@GetMapping("{userId}/downloadZip")
	public void downloadZipWithUserDocuments(@PathVariable Long userId, HttpServletResponse response) throws Exception {
		User user = userRepository.findUserById(userId);
		if (user == null) {
			response.setStatus(404);
		} else {
			if (fileService.getUploadedFiles(userId) == null) {
				response.setStatus(404);
			} else {
				docService.csvFileCreator(userId);
				fileService.downloadAllUserFiles(userId, response);
			}
		}

	}

	@RequestMapping(value = "download", method = RequestMethod.POST)
	public void downloadPDFResource(HttpServletRequest request, HttpServletResponse response,
			@RequestBody FileDTO fileData) {
//If user is not authorized - he should be thrown out from here itself

//Authorized user will download the file

		Path file = Paths.get(
				"/tmp/Uploads/" + fileData.getUserId() + "/" + fileData.getDocumentId() + "/" + fileData.getFileName());
		if (Files.exists(file)) {
			response.setContentType("application/OCTET-STREAM");
			response.addHeader("Content-Disposition", "attachment; filename=" + fileData.getFileName());

			try {
				Files.copy(file, response.getOutputStream());
				response.getOutputStream().flush();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}

}
