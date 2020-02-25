package it.akademija.filesCRUD;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

	private Path fileStorageLocation;

	@Transactional
	public String storeUploadedFile(MultipartFile file, Long userId, Long documentId) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		fileStorageLocation = Files.createDirectories(Paths.get("/tmp/Uploads/" + userId + "/" + documentId));

		try {
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			throw ex;
		}
	}

	@Transactional
	public List<String> getUploadedFilesNames(Long userId, Long documentId) {
		List<String> results = new ArrayList<String>();
		File[] files = new File("/tmp/Uploads/" + userId + "/" + documentId).listFiles();

		for (File file : files) {
			if (file.isFile()) {
				results.add(file.getName());
			}
		}
		return results;
	}

	@Transactional
	public List<String> getUploadedFilesPaths(Long userId, Long documentId) {
		List<String> results = new ArrayList<String>();
		try (Stream<Path> walk = Files.walk(Paths.get("/tmp/Uploads/" + userId + "/" + documentId))) {
			List<String> result = walk.filter(Files::isRegularFile).map(x -> x.toString()).collect(Collectors.toList());

			results = result;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return results;
	}

	public void deleteAllFilesFromFolder(Long userId, Long documentId) throws IOException {
		FileUtils.cleanDirectory(new File("/tmp/Uploads/" + userId + "/" + documentId));
	}

}
