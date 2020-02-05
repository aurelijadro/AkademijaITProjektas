package it.akademija.admin;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class MainController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Secured({ "ROLE_ADMIN" })
	@RequestMapping("/admin")
	public ModelAndView redirectWithUsingForwardPrefixAdmin(ModelMap model) {
		// model.addAttribute("attribute", "forwardWithForwardPrefix");
		logger.debug("User ({}) logged as admin", model);
		return new ModelAndView("forward:/", model);
	}

	@Secured({ "ROLE_USER" })
	@RequestMapping("/user")
	public ModelAndView redirectWithUsingForwardPrefixUser(ModelMap model) {
		// model.addAttribute("attribute", "forwardWithForwardPrefix");
		logger.debug("User ({}) logged as user");
		return new ModelAndView("forward:/", model);
	}

}
