package it.akademija.newGroup;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import it.akademija.doctype.Doctype;

@Entity
public class GroupClass {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String title;
	
	@ManyToMany(mappedBy = "groupSet")
    private Set<Doctype> doctypeSet = new HashSet<>();

    public GroupClass(String title) {
        this.title = title;
    }

	public GroupClass() {
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

	public Set<Doctype> getDoctypeSet() {
		return doctypeSet;
	}

	public void setDoctypeSet(Set<Doctype> doctypeSet) {
		this.doctypeSet = doctypeSet;
	}
	
	public void addDoctype(Doctype doctype) {
		this.doctypeSet.add(doctype);
		doctype.getGroupSet().add(this);
	}
	
	public void deleteDoctype(Doctype doctype) {
		this.doctypeSet.remove(doctype);
		doctype.getGroupSet().remove(this);
	}
    
}
