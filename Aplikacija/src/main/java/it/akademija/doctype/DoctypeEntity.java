package it.akademija.doctype;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.document.MainDocument;
import it.akademija.group.GroupEntity;

@Entity
@Table(name = "doctypes")
public class DoctypeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String title;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "creatinggroups", joinColumns = { @JoinColumn(name = "doctype_id") }, inverseJoinColumns = {
			@JoinColumn(name = "group_id") })
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<GroupEntity> creatingGroups = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "moderatinggroups", joinColumns = { @JoinColumn(name = "doctype_id") }, inverseJoinColumns = {
			@JoinColumn(name = "group_id") })
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<GroupEntity> moderatingGroups = new HashSet<>();

	@OneToMany(mappedBy = "doctypes")
	private List<MainDocument> mainDocuments = new ArrayList<>();

	public DoctypeEntity() {
	}

	public DoctypeEntity(Long id, String title) {
		this.id = id;
		this.title = title;
	}

	public DoctypeEntity(String title) {
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

	public Set<GroupEntity> getCreatingGroups() {
		return creatingGroups;
	}

	public void setCreatingGroups(Set<GroupEntity> creatingGroups) {
		this.creatingGroups = creatingGroups;
	}

	public void addCreatingGroup(GroupEntity group) {
		this.creatingGroups.add(group);
	}

	public void removeCreatingGroup(GroupEntity group) {
		this.creatingGroups.remove(group);
	}

	public Set<GroupEntity> getModeratingGroups() {
		return moderatingGroups;
	}

	public void setModeratingGroups(Set<GroupEntity> moderatingGroups) {
		this.moderatingGroups = moderatingGroups;
	}

	public void addModeratingGroup(GroupEntity group) {
		this.moderatingGroups.add(group);
	}

	public void removeModeratingGroup(GroupEntity group) {
		this.moderatingGroups.remove(group);
	}

	public void addDocument(MainDocument document) {
		if (mainDocuments.contains(document)) {
			return;
		} else {
			this.mainDocuments.add(document);
			document.setDoctypes(this);
		}
	}

}
