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

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST }, mappedBy = "groups")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<DoctypeEntity> doctypes = new HashSet<>();

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

	public void removeDoctype(DoctypeEntity doctype) {
		if (doctypes.contains(doctype)) {
			this.doctypes.remove(doctype);
			doctype.removeGroup(this);
		}
	}

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
