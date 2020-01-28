package it.akademija.user;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public class NewUser {

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

	private String roleName;

	public NewUser(String name, String surname, String username, String password, String roleName) {
		super();
		this.name = name;
		this.surname = surname;
		this.username = username;
		this.password = password;
		this.roleName = roleName;
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

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
