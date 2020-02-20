//package it.akademija.document;
//
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//
//@Entity
//public class FileForDocument {
//	
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private Long id;
//	
//	private String title;
//	
//	@ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
//	@JoinColumn(name = "mainDocument_id")
//	private MainDocument mainDocument;
//
//	public FileForDocument(Long id, String title) {
//		this.id = id;
//		this.title = title;
//	}
//	
//	public FileForDocument() {}
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//	
//	public String getFileBasePath() {
//		Path currentRelativePath = Paths.get("");
//		String fileBasePath = currentRelativePath.toAbsolutePath().toString();
//		return fileBasePath;
//	}
//
//	public MainDocument getDocument() {
//		return mainDocument;
//	}
//
//	public void setDocument(MainDocument mainDocument) {
//		this.mainDocument = mainDocument;
//	}
//	
//	
//
//}
