package it.akademija.user;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InitialUserInsertionBean {

	@Autowired
	UserRepository userRepo;

	@Autowired
	UserService userService;

	@PostConstruct
	public void init() {
		if (userRepo.findAll().size() == 0) {
			userService.addUser(new NewUser("Laikinas", "Administratorius", "Admin", "admin", "ADMIN"));
		}
	}
}