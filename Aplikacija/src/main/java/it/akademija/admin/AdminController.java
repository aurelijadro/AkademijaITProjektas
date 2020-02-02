package it.akademija.admin;

import javax.servlet.http.HttpServletResponse;

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
public class AdminController {

//	@RequestMapping(value = "/admin")
//	public void handleGet(HttpServletResponse response) {
//		response.setHeader("Location", "admin");
//		response.setStatus(302);
//
//	}

//	@RequestMapping(value = { "/", "/admin/**", "/user/**", "/doctypes/" })
//	public String index(HttpServletResponse response) {
//		response.setStatus(307);
//		return "public/index.html";
//	}

	@RequestMapping("/admin")
	public ModelAndView redirectWithUsingForwardPrefix(ModelMap model) {
		// model.addAttribute("attribute", "forwardWithForwardPrefix");
		return new ModelAndView("forward:/", model);
	}

//	@RequestMapping("/admin")
//	public RedirectView localRedirect() {
//		RedirectView redirectView = new RedirectView();
//		redirectView.setUrl("/");
//		return redirectView;
//	}

//	@RequestMapping(path = "/admin")
//	public void admin(HttpServletResponse response) {
//		response.setHeader("Location", "/admin");
//		response.setStatus(302);
//	}

//	@RequestMapping(path = "/admin")
//	public String admin() {
//		return "admin";
//	}

}
