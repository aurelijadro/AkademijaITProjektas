package it.akademija.user;

import java.util.List;
import java.util.Set;

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
import it.akademija.group.GroupEntity;

@RestController
@Api(value = "user")
@RequestMapping(value = "/api/users")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get users", notes = "Returns all users")
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	@ApiOperation(value = "Find user by id", notes = "Returns user by id")
	public User getUserById(@ApiParam(value = "user id", required = true) @PathVariable Long id,
			HttpServletResponse response) {
		User user = userService.findById(id);
		if (user == null) {
			logger.debug("User [{}] was  not found by controller", id);
			response.setStatus(404);
			return null;
		}
		return user;
	}

	@RequestMapping(path = "/{id}/groups", method = RequestMethod.GET)
	@ApiOperation(value = "Get groups of user by user id", notes = "Returns all groups that user belongs to")
	public Set<GroupEntity> getUsersGroupsByUserId(@ApiParam(value = "user id", required = true) @PathVariable Long id,
			HttpServletResponse response) {
		User user = userService.findById(id);
		if (user == null) {
			response.setStatus(404);
			return null;
		} else {
			response.setStatus(200);
			return user.getGroups();
		}
	}

	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Add new user", notes = "Returns new user")
	public User addNewUser(@RequestBody final NewUser newUser, HttpServletResponse response) {
		if (userService.findByUsername(newUser.getUsername()) == null) {
			response.setStatus(200);
			logger.debug("Initiated by [{}]: User [{}] with role [{}]was  created #",
					SecurityContextHolder.getContext().getAuthentication().getName(), newUser.getUsername(),
					newUser.getRole());
			return userService.addUser(newUser);
		}
		response.setStatus(404);
		logger.debug("Failed to create new user ({}).", newUser.getUsername());
		return null;

	}

	@RequestMapping(path = "/{id}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update existing user info", notes = "Returns user with new info")
	public User updateUser(@PathVariable Long id, @RequestBody final NewUser newUser, HttpServletResponse response) {
		User user = userService.findById(id);
		if (user == null) {
			logger.debug("Initiated by [{}]: User [{}] was  not found",
					SecurityContextHolder.getContext().getAuthentication().getName(), id);

			response.setStatus(404);
			return null;
		}
		logger.debug("Initiated by [{}]: User [{}] was  updated",
				SecurityContextHolder.getContext().getAuthentication().getName(), id);

		return userService.updateUser(id, newUser);
	}

}
