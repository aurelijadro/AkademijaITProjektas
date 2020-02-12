package it.akademija.document;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.user.User;

@Entity
public class MainDocument {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true)
	private Long id;

	private String title;

	private String summary;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "doctype_id")
	private DoctypeEntity doctypes;

	@OneToMany(mappedBy = "mainDocument", cascade = CascadeType.ALL)
	private List<FileForDocument> files = new ArrayList<>();

	public MainDocument() {
	}

	public MainDocument(String title, String summary) {
		this.title = title;
		this.summary = summary;
	}

	public void addFile(FileForDocument file) {
		this.files.add(file);
		file.setDocument(this);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

}
