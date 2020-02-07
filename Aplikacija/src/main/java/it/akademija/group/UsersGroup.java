package it.akademija.group;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import it.akademija.doctype.Doctype;

@Entity
public class UsersGroup {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(unique = true)
	private String title;
	
	@ManyToMany(mappedBy="groups", cascade = {CascadeType.MERGE, CascadeType.DETACH})
	private List<Doctype> doctypes;

	public UsersGroup(String title) {
		this.title = title;
	}

	public UsersGroup() {
	}

	public UsersGroup(String title, List<Doctype> doctypes) {
		this.title = title;
		this.doctypes = doctypes;
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

	public List<Doctype> getDoctypes() {
		return doctypes;
	}

	public void setDoctypes(List<Doctype> doctypes) {
		this.doctypes = doctypes;
	}

	public void addDoctypeToGroup(Doctype doctype) {
		this.doctypes.add(doctype);
		
	}

}
