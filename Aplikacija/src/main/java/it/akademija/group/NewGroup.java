package it.akademija.group;

import java.util.List;

import it.akademija.doctype.Doctype;

public class NewGroup {
	
	private String title;
	
	private List<Doctype> doctypes;

	public NewGroup(String title, List<Doctype> doctypes) {
		this.title = title;
		this.doctypes = doctypes;
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

}
