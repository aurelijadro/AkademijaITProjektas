package it.akademija.user;

import java.util.Set;

import it.akademija.group.GroupEntity;

public class UserDTO {

	private Long id;

	private String name;

	private String surname;

	private String username;

	private Set<GroupEntity> groups;

	private Long count;

	public UserDTO(Long id, String name, String surname, String username, Set<GroupEntity> groups) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.groups = groups;
	}

	public UserDTO(Long id, String name, String surname, String username, Set<GroupEntity> groups, Long count) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.groups = groups;
		this.count = count;
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

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
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

	public Set<GroupEntity> getGroups() {
		return groups;
	}

	public void setGroups(Set<GroupEntity> groups) {
		this.groups = groups;
	}

}
