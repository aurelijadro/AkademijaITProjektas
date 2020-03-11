package it.akademija.filesCRUD;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import it.akademija.document.MainDocumentRepository;
import it.akademija.user.UserRepository;

@Service
public class FileService {

	private static final Logger logger = LoggerFactory.getLogger(FileService.class);
	private Path fileStorageLocation;

	@Autowired
	FileRepository fileRepo;

	@Autowired
	UserRepository userRepo;

	@Autowired
	MainDocumentRepository mainDocRepo;

//	@Transactional
//	public FileEntity createNew(NewFile newFile, Long documentId) {
//		MainDocument document = mainDocRepo.findMainDocumentById(documentId);
//		FileEntity someFile = new FileEntity(newFile.getFileName(), newFile.getFileDownloadUri(), newFile.getFileType(),
//				newFile.getSize(), document);
//		someFile.setDocument(document);
//		document.addFile(someFile);
//		someFile.setDocument(document);
//		return fileRepo.save(someFile);
//	}

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
			} else {
				continue;
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

	@Transactional
	public List<FileDTO> getUploadedFilesData(Long userId, Long documentId) {
		List<FileDTO> results = new ArrayList<FileDTO>();
		File[] files = new File("/tmp/Uploads/" + userId + "/" + documentId).listFiles();

		for (File file : files) {
			if (file.isFile()) {
				results.add(new FileDTO(file.getName(), file.getAbsolutePath()));
			} else {
				continue;
			}
		}
		return results;
	}

	@Transactional
	public List<String> getUploadedFiles(Long userId) {
		List<String> results = new ArrayList<String>();
		try (Stream<Path> walk = Files.walk(Paths.get("/tmp/Uploads/" + userId))) {
			List<String> result = walk.filter(Files::isRegularFile).map(x -> x.toString()).collect(Collectors.toList());

			results = result;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return results;
	}

	@Transactional
	public void deleteDocumentFolder(Long userId, Long documentId) {
		try {
			FileUtils.deleteDirectory(new File("/tmp/Uploads/" + userId + "/" + documentId));
		} catch (IOException e) {
			logger.error(e.toString());
		}
	}

	@Transactional
	public void deleteFilesInFolder(Long userId, Long documentId) {
		try {
			FileUtils.cleanDirectory(new File("/tmp/Uploads/" + userId + "/" + documentId));
		} catch (IOException e) {
			logger.error(e.toString());
		}
	}

//	@Transactional
//	public void deleteOneFile(Long userId, Long documentId, String fileName) {
//		try {
//			String fileName = storeUploadedFile(fileData, userId, documentId);
//			String path = Paths.get("/tmp/Uploads/" + userId + "/" + documentId + "/" + fileName).toString();
//
//			File file = new File(path);
//
//			if (file != null) {
//				file.delete();
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}

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

	@Transactional
	public void downloadAllUserFiles(Long userId, HttpServletResponse response) throws Exception {

		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename=download.zip");
		response.setStatus(HttpServletResponse.SC_OK);

		List<String> fileNames = getUploadedFiles(userId);

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

	@Transactional
	public void sqlToCSV(Long userId) throws IOException {
		String filename = "csvFile";
		File file = Paths.get(("/tmp/Uploads/" + userId), filename + ".csv").toFile();
		try {
			FileWriter fw = new FileWriter(file);
			Class.forName("org.h2.Driver").newInstance();
			Connection conn = DriverManager.getConnection("jdbc:h2:file:~/home/gentoo5.db", "sa", "");
			String query = "SELECT * FROM MAIN_DOCUMENT";
//			String query = "SELECT MAIN_DOCUMENT.ID, USERNAME, DOCTYPES.TITLE, MAIN_DOCUMENT.TITLE, SUMMARY,"
//					+ "SUBMISSION_DATE, DOCUMENT_STATUS,  APPROVAL_DATE,"
//					+ "REJECTION_DATE, APPROVER_ID, REJECTION_REASON  FROM MAIN_DOCUMENT JOIN USER ON MAIN_DOCUMENT.USER_ID=USER.ID"
//					+ "JOIN DOCTYPES ON MAIN_DOCUMENT.DOCTYPE_ID=DOCTYPES.ID WHERE USER.ID = 1";
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			fw.write("ID");
			fw.append(",");
			fw.write("Autorius");
			fw.append(",");
			fw.write("Dokumento tipas");
			fw.append(",");
			fw.write("Pavadinimas");
			fw.append(",");
			fw.write("Aprašymas");
			fw.append(",");
			fw.write("Pateikimo data");
			fw.append(",");
			fw.write("Dokumento statusas");
			fw.append(",");
			fw.write("Patvirtinimo data");
			fw.append(",");
			fw.write("Atmetimo data");
			fw.append(",");
			fw.write("Priėmėjas");
			fw.append(",");
			fw.write("Atmetimo priežastis");
			fw.append("\n");
			while (rs.next()) {
				fw.append(rs.getString(1));
				fw.append(',');
				fw.append(rs.getString(2));
				fw.append(',');
				fw.append(rs.getString(3));
				fw.append(',');
				fw.append(rs.getString(4));
				fw.append(',');
				fw.append(rs.getString(5));
				fw.append(',');
				fw.append(rs.getString(6));
				fw.append(',');
				fw.append(rs.getString(7));
				fw.append(',');
				fw.append(rs.getString(8));
				fw.append(',');
				fw.append(rs.getString(9));
				fw.append(',');
				fw.append(rs.getString(10));
				fw.append(',');
				fw.append(rs.getString(11));
				fw.append('\n');
			}
			fw.flush();
			fw.close();
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
