package it.akademija.group;

public class GroupDTO {

	private Long id;
	
	private String title;
	
	private String[] doctypes;

	public GroupDTO(Long id, String title, String[] doctypes) {
		this.id = id;
		this.title = title;
		this.doctypes = doctypes;
	}

	public GroupDTO() {
		super();
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

	public String[] getDoctypes() {
		return doctypes;
	}

	public void setDoctypes(String[] doctypes) {
		this.doctypes = doctypes;
	}

}
