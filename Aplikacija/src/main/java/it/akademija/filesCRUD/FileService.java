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
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import it.akademija.document.MainDocumentService;

@Service
public class FileService {

	private static final Logger logger = LoggerFactory.getLogger(FileService.class);
	private Path fileStorageLocation;

	@Transactional
	public String storeUploadedFile(MultipartFile file, Long userId) throws IOException {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		fileStorageLocation = Files.createDirectories(Paths.get("/tmp/Uploads/" + userId));

		try {
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

			return fileName;
		} catch (IOException ex) {
			throw ex;
		}
	}

	@Transactional
	public List<String> getUploadedFilesNames(Long userId) {
		List<String> results = new ArrayList<String>();
		File[] files = new File("/tmp/Uploads/" + userId).listFiles();

		for (File file : files) {
			if (file.isFile()) {
				results.add(file.getName());
			} else {
				results = null;
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

	public void deleteAllFilesFromFolder(Long userId, Long documentId) {
		try {
			FileUtils.cleanDirectory(new File("/tmp/Uploads/" + userId + "/" + documentId));
		} catch (IOException e) {
			logger.error(e.toString());
		}
	}

	@Transactional
	public void downloadFile(Long userId, Long documentId, HttpServletResponse response) throws Exception {

		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename=download.zip");
		response.setStatus(HttpServletResponse.SC_OK);

		List<String> fileNames = getUploadedFilesPaths(userId, documentId);

		{

			try (ZipOutputStream zippedOut = new ZipOutputStream(response.getOutputStream())) {
				for (String file : fileNames) {
					FileSystemResource resource = new FileSystemResource(file);

					ZipEntry e = new ZipEntry(resource.getFilename());
					e.setSize(resource.contentLength());
					e.setTime(System.currentTimeMillis());
					zippedOut.putNextEntry(e);
					StreamUtils.copy(resource.getInputStream(), zippedOut);
					zippedOut.closeEntry();
				}
				zippedOut.finish();
			} catch (Exception e) {
				throw e;
			}

		}
	}

}
