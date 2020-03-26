package it.akademija.user;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.group.GroupEntity;

@Service
public class UserService implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			logger.debug("User [{})] was not found.", username);
			throw new UsernameNotFoundException(username + " not found.");
		}

		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				AuthorityUtils.createAuthorityList(new String[] { "ROLE_" + user.getRole() }));
	}

	UserRepository userRepository;

	PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Transactional
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Transactional
	public List<User> getAllUsers(Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize);

		Page<User> pagedResult = userRepository.findAll(paging);

		if (pagedResult.hasContent()) {
			return pagedResult.getContent();
		} else {
			return new ArrayList<User>();
		}
	}

	@Transactional
	public UserDTO findByUsername(String username) {
		User user = userRepository.findByUsername(username);
		return new UserDTO(user.getId(), user.getName(), user.getSurname(), user.getUsername(), user.getGroups());
	}

	@Transactional
	public UserDTO findById(Long id) {
		User user = userRepository.findUserById(id);
		return new UserDTO(user.getId(), user.getName(), user.getSurname(), user.getUsername(), user.getGroups());
	}

	@Transactional
	public User addUser(NewUser newUser) {

		User user = new User(newUser.getName(), newUser.getSurname(), newUser.getUsername(),
				(encoder.encode(newUser.getPassword())), newUser.getRole());

		return userRepository.save(user);

	}

	@Transactional
	public User updateUser(Long id, NewUser newUser) {
		User existingUser = userRepository.findUserById(id);
		existingUser.setName(newUser.getName());
		existingUser.setSurname(newUser.getSurname());
		existingUser.setUsername(newUser.getUsername());
		existingUser.setPassword(encoder.encode(newUser.getPassword()));
		existingUser.setRole(newUser.getRole());

		return existingUser;
	}

	@Transactional
	public Set<DoctypeEntity> getDoctypesUserCreates(Long id) {
		User user = userRepository.findUserById(id);
		if (user == null) {
			return null;
		}
		Set<GroupEntity> userGroups = user.getGroups();
		Set<DoctypeEntity> doctypesUserCreates = new HashSet<DoctypeEntity>();
		for (GroupEntity group : userGroups) {
			doctypesUserCreates.addAll(group.getDoctypesToCreate());
		}

		return doctypesUserCreates;

	}

	@Transactional
	public Set<DoctypeEntity> getDoctypesUserModerates(Long id) {
		User user = userRepository.findUserById(id);
		if (user == null) {
			return null;
		}
		Set<GroupEntity> userGroups = user.getGroups();
		Set<DoctypeEntity> doctypesUserModerates = new HashSet<DoctypeEntity>();
		for (GroupEntity group : userGroups) {
			doctypesUserModerates.addAll(group.getDoctypesToModerate());
		}

		return doctypesUserModerates;

	}

	@Transactional
	public Boolean isUserModerator(Long id) {
		if (getDoctypesUserModerates(id).isEmpty() || getDoctypesUserModerates(id) == null) {
			return false;
		}
		return true;
	}

	@Transactional
	public UsersForPaging searchForUsersWithPaging(String searchText, int page) {
		Pageable pageable = PageRequest.of(page, 12);

		return new UsersForPaging(
				userRepository
						.findByUsernameContainingIgnoreCaseOrNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(
								searchText, searchText, searchText, pageable)
						.stream()
						.map((user) -> new UserDTO(user.getId(), user.getName(), user.getSurname(), user.getUsername(),
								user.getGroups()))
						.collect(Collectors.toList()),
				userRepository
						.countByUsernameContainingIgnoreCaseOrNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(
								searchText, searchText, searchText));
	}

}
