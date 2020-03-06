package it.akademija.filesCRUD;

public class FileDTO {

	private String fileName;
	private String fileDownloadUri;

	public FileDTO(String fileName, String fileDownloadUri) {
		this.fileName = fileName;
		this.fileDownloadUri = fileDownloadUri;
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

}
