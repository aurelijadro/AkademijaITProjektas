package it.akademija.doctype;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public class NewDoctype {
	
	@NotNull
	@Length(min = 1, max = 100)
	private String title;
	
	public NewDoctype() {}

	public NewDoctype(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
