package it.akademija.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = findByUsername(username);
		if (user == null)
			throw new UsernameNotFoundException(username + " not found.");
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				AuthorityUtils.createAuthorityList(new String[] { "ROLE_" }));
	}

	UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Transactional
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Transactional
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Transactional
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	@Transactional
	public boolean exists(String username) {
		return userRepository.existsUserByUsername(username);
	}

	@Transactional
	public User addUser(NewUser newUser) {

		User user = new User(null, newUser.getName(), newUser.getSurname(), newUser.getUsername(),
				newUser.getPassword(), newUser.getRoleName());
		return userRepository.save(user);

	}

	@Transactional
	public User updateUser(String username, NewUser newUser) {
		User existingUser = findByUsername(username);
		existingUser.setName(newUser.getName());
		existingUser.setSurname(newUser.getSurname());
		existingUser.setUsername(newUser.getUsername());
		existingUser.setPassword(newUser.getPassword());
		return existingUser;
	}

}
