package it.akademija.user;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.PagingData;
import it.akademija.doctype.DoctypeEntity;
import it.akademija.group.GroupEntity;

@RestController
@Api(value = "user")
@RequestMapping(value = "/api/users")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PagingData paging;

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get users", notes = "Returns all users")
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/all", method = RequestMethod.GET)
	public List<User> getAllUsers(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "10") Integer pageSize) {
		return userService.getAllUsers(pageNo, pageSize);
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@RequestMapping(path = "/{id}/doctypesusercreates", method = RequestMethod.GET)
	@ApiOperation(value = "Get doctypes user can create")
	public Set<DoctypeEntity> getDoctypesUserCanCreate(
			@ApiParam(value = "user id", required = true) @PathVariable Long id, HttpServletResponse response) {
		Set<DoctypeEntity> doctypestocreate = userService.getDoctypesUserCreates(id);
		if (doctypestocreate == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return doctypestocreate;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@RequestMapping(path = "/{id}/doctypesusermoderates", method = RequestMethod.GET)
	@ApiOperation(value = "Get doctypes user can moderate")
	public Set<DoctypeEntity> getDoctypesUserCanModerate(
			@ApiParam(value = "user id", required = true) @PathVariable Long id, HttpServletResponse response) {
		Set<DoctypeEntity> doctypestomoderate = userService.getDoctypesUserModerates(id);
		if (doctypestomoderate == null) {
			response.setStatus(404);
			return null;
		}
		response.setStatus(200);
		return doctypestomoderate;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@RequestMapping(path = "/{id}/ismoderator", method = RequestMethod.GET)
	@ApiOperation(value = "Check if user is moderator")
	public Boolean isModerator(@ApiParam(value = "user id", required = true) @PathVariable Long id,
			HttpServletResponse response) {
		return userService.isUserModerator(id);
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	@ApiOperation(value = "Find user by id", notes = "Returns user by id")
	public UserDTO getUserById(@ApiParam(value = "user id", required = true) @PathVariable Long id,
			HttpServletResponse response) {
		UserDTO user = userService.findById(id);
		if (user == null) {
			logger.debug("User [{}] was  not found by controller", id);
			response.setStatus(404);
			return null;
		}
		return user;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@RequestMapping(path = "/{id}/groups", method = RequestMethod.GET)
	@ApiOperation(value = "Get groups of user by user id", notes = "Returns all groups that user belongs to")
	public Set<GroupEntity> getUsersGroupsByUserId(@ApiParam(value = "user id", required = true) @PathVariable Long id,
			HttpServletResponse response) {
		User user = userRepository.findUserById(id);
		if (user == null) {
			response.setStatus(404);
			return null;
		} else {
			response.setStatus(200);
			return user.getGroups();
		}
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Add new user", notes = "Returns new user")
	public User addNewUser(@RequestBody final NewUser newUser, HttpServletResponse response) {
		if (userRepository.findByUsername(newUser.getUsername()) == null) {
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

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/{id}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update existing user info", notes = "Returns user with new info")
	public User updateUser(@PathVariable Long id, @RequestBody final NewUser newUser, HttpServletResponse response) {
		User user = userRepository.findUserById(id);
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

	@RequestMapping(path = "search/{pageNum}", method = RequestMethod.PUT)
	@ApiOperation(value = "Search for users", notes = "Returns found list of users")
	public UsersForPaging searchForUsers(@RequestBody(required = false) String searchText, @PathVariable int pageNum) {
		if (searchText == null) {
			searchText = "";
		}
		return userService.searchForUsersWithPaging(searchText, pageNum);
	}

}
