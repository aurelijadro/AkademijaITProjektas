//package it.akademija.filesCRUD;
//
//import java.io.IOException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//@RestController
//public class FileController {
//
//	@Autowired
//	private FileService fileService;
//
//	@PostMapping("file/uploadFile")
//	public FileEntity uploadFile(@RequestParam("file") MultipartFile file, String username, Long documentId)
//			throws IOException {
//		String fileName = fileService.storeUploadedFile(file, username, documentId);
//
//		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
//				.path(fileName).toUriString();
//
//		return new FileEntity(fileName, fileDownloadUri, file.getContentType(), file.getSize());
//	}
//
//}
