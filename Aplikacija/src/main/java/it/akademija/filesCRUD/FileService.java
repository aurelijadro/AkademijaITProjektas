//package it.akademija.filesCRUD;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//
//import org.springframework.stereotype.Service;
//import org.springframework.util.StringUtils;
//import org.springframework.web.multipart.MultipartFile;
//
//@Service
//public class FileService {
//
//	private Path fileStorageLocation;
//
////	@Autowired
////	private UserRepository userRepo;
////
////	private MainDocumentRepository mainDocRepo;
//
//	public FileService(Path fileStorageLocation) throws IOException {
//		this.fileStorageLocation = Files.createDirectories(Paths.get("/tmp/Uploads/"));
//	}
//
//	public String storeUploadedFile(MultipartFile file, String username, Long documentId) throws IOException {
////		User user = userRepo.findByUsername(username);
////		MainDocument document = mainDocRepo.findMainDocumentById(documentId);
//		String filename = StringUtils.cleanPath(file.getOriginalFilename());
//		fileStorageLocation = Files.createDirectories(Paths.get("{username}/{documentId}"));
//
//		try {
//			Path targetLocation = fileStorageLocation.resolve(filename);
//			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
//
//			return filename;
//
//		} catch (IOException ex) {
//			throw ex;
//		}
//	}
//
//}
