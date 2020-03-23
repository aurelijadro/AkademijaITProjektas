package it.akademija;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.user.User;
import it.akademija.user.UserRepository;
import it.akademija.user.UserService;

@RestController
@RequestMapping(value = "/api")
public class AppController {

	@Autowired
	UserRepository userRepository;

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@RequestMapping(path = "/loggedUsername", method = RequestMethod.GET)
	public String getLoggedInUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			String currentUserName = authentication.getName();

			return currentUserName;
		}
		return "not logged";
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@RequestMapping(path = "/loggedUserId", method = RequestMethod.GET)
	public Long getLoggedInUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			String currentUserName = authentication.getName();
			User user = userRepository.findByUsername(currentUserName);
			if (user == null) {
				return -1l;
			}
			return userRepository.findByUsername(currentUserName).getId();
		}
		return -1l;
	}

}
