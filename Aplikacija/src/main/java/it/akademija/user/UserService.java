package it.akademija.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService 
implements UserDetailsService
{
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = findByUsername(username);
		if(user == null) 
			throw new UsernameNotFoundException(username + " not found.");
			return new org.springframework.security.core.userdetails.User(
					user.getUsername(), user.getPassword(), AuthorityUtils.createAuthorityList(new String [] { "ROLE_"}));
		}

	@Autowired UserRepository userRepository;
	
	@Transactional
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	@Transactional(readOnly = true)
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	



}
