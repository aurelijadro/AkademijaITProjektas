package it.akademija.filesCRUD;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import it.akademija.document.MainDocument;

@Entity
public class FileEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String fileName;
	private String fileDownloadUri;
	private String fileType;
	private Long size;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "mainDocument_id")
	private MainDocument mainDocument;

	public FileEntity() {
	}

	public FileEntity(Long id) {
		this.id = id;
	}

	public FileEntity(String fileName, String fileDownloadUri, String fileType, Long size, MainDocument mainDocument) {
		this.fileName = fileName;
		this.fileDownloadUri = fileDownloadUri;
		this.fileType = fileType;
		this.size = size;
		this.mainDocument = mainDocument;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public MainDocument getDocument() {
		return mainDocument;
	}

	public void setDocument(MainDocument mainDocument) {
		this.mainDocument = mainDocument;
	}

}
