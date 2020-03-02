package it.akademija.filesCRUD;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import it.akademija.document.MainDocument;
import it.akademija.document.MainDocumentService;
import it.akademija.user.User;
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

	@PostMapping("{userId}/{documentId}/uploadFile")
	public FileEntity uploadFile(@PathVariable Long userId, @PathVariable Long documentId,
			@RequestParam MultipartFile file) throws IOException {
		String fileName = fileService.storeUploadedFile(file, userId, documentId);

		if (fileName.isEmpty()) {
			return null;
		} else {

			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
					.path(fileName).toUriString();

			return new FileEntity(fileName, fileDownloadUri, file.getContentType(), file.getSize());
		}
	}

	@GetMapping("{userId}/{documentId}/uploadedFilesNames")
	public List<String> getListOfFiles(@PathVariable Long userId, @PathVariable Long documentId) throws IOException {
		if (fileService.getUploadedFilesNames(userId, documentId) == null) {
			return null;
		}
		return fileService.getUploadedFilesNames(userId, documentId);
	}

	@DeleteMapping("{userId}/{documentId}/delete")
	public void deleteFile(@PathVariable Long userId, @PathVariable Long documentId) throws IOException {
		fileService.deleteAllFilesFromFolder(userId, documentId);
	}

	@GetMapping("{userId}/{documentId}/downloadZip")
	public void downloadZipFromDocumentById(@PathVariable Long userId, @PathVariable Long documentId,
			HttpServletResponse response) throws Exception {
		User user = userService.findById(userId);
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

}
