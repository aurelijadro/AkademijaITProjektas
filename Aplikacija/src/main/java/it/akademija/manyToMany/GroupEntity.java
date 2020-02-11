package it.akademija.manyToMany;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.manyToMany2.DoctypeEntity;

@Entity
@Table(name = "groups")
public class GroupEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String title;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST }, mappedBy = "groups")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<DoctypeEntity> doctypes = new HashSet<>();

	public GroupEntity() {
	}

	public GroupEntity(String title) {
		this.title = title;
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

	public Set<DoctypeEntity> getDoctypes() {
		return doctypes;
	}

	public void setDoctypes(Set<DoctypeEntity> doctypes) {
		this.doctypes = doctypes;
	}

	public void addDoctype(DoctypeEntity doctype) {
		if (doctypes.contains(doctype)) {
			return;
		} else {
			this.doctypes.add(doctype);
			doctype.addGroup(this);
		}
	}

}
