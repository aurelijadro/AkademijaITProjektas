package it.akademija.newGroup;

import java.util.Set;

import it.akademija.doctype.Doctype;

public class CreateNewGroup {
	
	private Long id;
	
	private String title;
	
	private Set<Doctype> doctypes;

	public CreateNewGroup(String title, Set<Doctype> doctypes) {
		this.title = title;
		this.doctypes = doctypes;
	}

	public CreateNewGroup() {
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

	public Set<Doctype> getDoctypes() {
		return doctypes;
	}

	public void setDoctypes(Set<Doctype> doctypes) {
		this.doctypes = doctypes;
	}
	
	

}
