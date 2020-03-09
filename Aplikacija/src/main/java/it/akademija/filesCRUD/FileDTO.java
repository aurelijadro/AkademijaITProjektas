package it.akademija.filesCRUD;

public class FileDTO {

	private String fileName;
	private String fileDownloadUri;
	private Long userId;
	private Long documentId;

	public FileDTO(String fileName, String fileDownloadUri) {
		this.fileName = fileName;
		this.fileDownloadUri = fileDownloadUri;
	}

	public FileDTO(String fileName, Long userId, Long documentId) {
		this.fileName = fileName;
		this.userId = userId;
		this.documentId = documentId;
	}

	public FileDTO() {
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileDownloadUri() {
		return fileDownloadUri;
	}

	public void setFileDownloadUri(String fileDownloadUri) {
		this.fileDownloadUri = fileDownloadUri;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getDocumentId() {
		return documentId;
	}

	public void setDocumentId(Long documentId) {
		this.documentId = documentId;
	}

}
