package it.akademija.user;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.document.MainDocument;
import it.akademija.group.GroupEntity;
import it.akademija.role.UserRole;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Length(min = 1, max = 100)
	private String name;

	@NotNull
	@Length(min = 1, max = 100)
	private String surname;

	@Column(unique = true)
	@NotNull
	@Length(min = 1, max = 100)
	private String username;

	@NotNull
	@Length(min = 1, max = 100)
	private String password;

	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	private UserRole role;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<MainDocument> documents;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "users_groups", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "group_id") })
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Set<GroupEntity> groups = new HashSet<>();

	public User() {
	}

	public User(String name, String surname, String username, String password, String role) {
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.role = UserRole.valueOf(role);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role.toString();
	}

	public void setRole(String role) {
		this.role = UserRole.valueOf(role);
	}

	public Set<GroupEntity> getGroups() {
		return this.groups;
	}

	public void addGroup(GroupEntity group) {
		this.groups.add(group);
	}

	public void removeGroup(GroupEntity group) {
		this.groups.remove(group);
	}

}
