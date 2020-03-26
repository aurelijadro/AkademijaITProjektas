package it.akademija.user;

import java.util.List;

public class UsersForPaging {
	private List<UserDTO> users;
	private long usersCount;

	public UsersForPaging(List<UserDTO> users, long usersCount) {
		this.users = users;
		this.usersCount = usersCount;
	}

	public List<UserDTO> getUsers() {
		return users;
	}

	public void setUsers(List<UserDTO> users) {
		this.users = users;
	}

	public long getUsersCount() {
		return usersCount;
	}

	public void setUsersCount(int usersCount) {
		this.usersCount = usersCount;
	}
}
