package it.akademija.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "user")
@RequestMapping(value = "/api/users")
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get users", notes = "Returns all users")
	public List<User> getUsers() {
		return userService.getUsers();
	}

	// papildyti.

	@RequestMapping(path = "/{username}", method = RequestMethod.GET)
	@ApiOperation(value = "Find user by username", notes = "Returns user by username")
	public User getUserByUsername(String username) {
		return userService.findByUsername(username);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Add new user", notes = "Returns new user")
	public User addNewUser(@RequestBody final NewUser newUser) {
		return userService.addUser(newUser);
	}
	

}
