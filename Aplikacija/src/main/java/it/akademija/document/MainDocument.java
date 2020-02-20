package it.akademija.document;

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

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.filesCRUD.FileEntity;
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
	@JsonIgnore
	private User user;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "doctype_id")
	private DoctypeEntity doctypes;

	@OneToMany(mappedBy = "mainDocument", cascade = CascadeType.ALL)
	private List<FileEntity> filesForDocuments;

	public MainDocument() {
	}

	public MainDocument(String title, String summary) {
		this.title = title;
		this.summary = summary;
	}

	public MainDocument(Long id, String title, String summary) {
		this.id = id;
		this.title = title;
		this.summary = summary;
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

	public DoctypeEntity getDoctypes() {
		return doctypes;
	}

	public void setDoctypes(DoctypeEntity doctypes) {
		this.doctypes = doctypes;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void removeUser(User user) {
		user.removeDocument(this);
	}

}
