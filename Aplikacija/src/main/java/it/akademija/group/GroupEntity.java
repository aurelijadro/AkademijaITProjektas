package it.akademija.group;

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

import it.akademija.doctype.DoctypeEntity;
import it.akademija.user.User;

@Entity
@Table(name = "groups")
public class GroupEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String title;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
			CascadeType.PERSIST }, mappedBy = "creatingGroups")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<DoctypeEntity> doctypesToCreate = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
			CascadeType.PERSIST }, mappedBy = "moderatingGroups")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<DoctypeEntity> doctypesToModerate = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST }, mappedBy = "groups")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<User> users = new HashSet<>();

	public GroupEntity() {
	}

	public GroupEntity(String title) {
		this.title = title;
	}

	public GroupEntity(Long id, String title) {
		this.id = id;
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

	public Set<DoctypeEntity> getDoctypesToCreate() {
		return doctypesToCreate;
	}

	public void setDoctypesToCreate(Set<DoctypeEntity> doctypesToCreate) {
		this.doctypesToCreate = doctypesToCreate;
	}

	public void addDoctypeToCreate(DoctypeEntity doctype) {
		if (doctypesToCreate.contains(doctype)) {
			return;
		} else {
			this.doctypesToCreate.add(doctype);
			doctype.addCreatingGroup(this);
		}
	}

	public void removeDoctypeToCreate(DoctypeEntity doctype) {
		if (doctypesToCreate.contains(doctype)) {
			this.doctypesToCreate.remove(doctype);
			doctype.removeCreatingGroup(this);
		}
	}

	public Set<DoctypeEntity> getDoctypesToModerate() {
		return doctypesToModerate;
	}

	public void setDoctypesToModerate(Set<DoctypeEntity> doctypesToModerate) {
		this.doctypesToModerate = doctypesToModerate;
	}

//	public void addDoctypeToModerate(DoctypeEntity doctype) {
//		if (doctypesToModerate.contains(doctype)) {
//			return;
//		} else {
//			this.doctypesToModerate.add(doctype);
//			doctype.addGroup(this);
//		}
//	}
//
//	public void removeDoctypeToModerate(DoctypeEntity doctype) {
//		if (doctypesToModerate.contains(doctype)) {
//			this.doctypesToModerate.remove(doctype);
//			doctype.removeGroup(this);
//		}
//	}

	public Set<User> getUsers() {
		return users;
	}

	public void addUser(User user) {
		if (users.contains(user)) {
			return;
		} else {
			this.users.add(user);
			user.addGroup(this);
		}
	}

	public void removeUser(User user) {
		if (users.contains(user)) {
			this.users.remove(user);
			user.removeGroup(this);
		}
	}

}
