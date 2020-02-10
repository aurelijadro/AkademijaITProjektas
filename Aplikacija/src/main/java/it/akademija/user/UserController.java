package it.akademija.user;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@Api(value = "user")
@RequestMapping(value = "/api/users")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

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

	@RequestMapping(path = "/{username}", method = RequestMethod.GET)
	@ApiOperation(value = "Find user by username", notes = "Returns user by username")
	public User getUserByUsername(@ApiParam(value = "user username", required = true) @PathVariable String username,
			HttpServletResponse response) {
		User user = userService.findByUsername(username);
		if (user == null) {
			logger.debug("User [{}] was  not found by controller",user.getUsername());
			response.setStatus(404);
			return null;
		}
		return userService.findByUsername(username);
	}

//	@RequestMapping(path = "/byId/{id}", method = RequestMethod.GET)
//	@ApiOperation(value = "Get user by ID", notes = "Returns a single user by ID")
//	public User getUserById(@ApiParam(value = "user id", required = true) @Valid @PathVariable String id,
//			HttpServletResponse response) {
//		if (userService.findById(Long.parseLong(id)).isPresent()) {
//			return userService.findById(Long.parseLong(id)).get();
//		} else {
//			response.setStatus(404);
//			return null;
//		}
//	}

	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Add new user", notes = "Returns new user")
	public User addNewUser(@RequestBody final NewUser newUser, HttpServletResponse response) {
		if (userService.findByUsername(newUser.getUsername()) == null) {
			response.setStatus(200);
			logger.debug("Initiated by [{}]: User [{}] with role [{}]was  created #",
					SecurityContextHolder.getContext().getAuthentication().getName(), newUser.getUsername(), newUser.getRole());
			return userService.addUser(newUser);
		}
		response.setStatus(404);
		logger.debug("Failed to create new user ({}).", newUser.getUsername() );
		return null;

	}

	@RequestMapping(path = "/{username}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update existing user info", notes = "Returns user with new info")
	public User updateUser(@PathVariable String username, @RequestBody final NewUser newUser,
			HttpServletResponse response) {
		User user = userService.findByUsername(username);
		if (user == null) {
			logger.debug("Initiated by [{}]: User [{}] was  not found from controller2 #",
					SecurityContextHolder.getContext().getAuthentication().getName(), user.getUsername());
			
			response.setStatus(404);
			return null;
		}
		logger.debug("Initiated by [{}]: User [{}] was  updated #",
				SecurityContextHolder.getContext().getAuthentication().getName(), user.getUsername());
		
		return userService.updateUser(username, newUser);
	}

}
