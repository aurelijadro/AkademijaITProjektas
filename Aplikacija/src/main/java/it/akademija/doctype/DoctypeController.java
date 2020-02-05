package it.akademija.doctype;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@Api(value = "doctype")
@RequestMapping(value = "/api/doctypes")
public class DoctypeController {
	
	private static final Logger logger = LoggerFactory.getLogger(DoctypeController.class);

	private DoctypeService doctypeService;

	@Autowired
	public DoctypeController(DoctypeService doctypeService) {
		this.doctypeService = doctypeService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get doctypes", notes = "Returns all doctypes")
	public List<Doctype> getDoctypes() {
		return doctypeService.getDoctypes();
	}

	@RequestMapping(path = "/{title}", method = RequestMethod.GET)
	@ApiOperation(value = "Find doctype by title", notes = "Returns doctype by title")
	public Doctype getDoctypeByTitle(@ApiParam(value = "doctype title", required = true) @PathVariable String title,
			HttpServletResponse response) {
		Doctype doctype = doctypeService.findDoctypeByTitle(title);
		if (doctype == null) {
			response.setStatus(404);
			logger.debug("Doctype ({}) was not found.", doctype.getTitle());
			return null;
		}
		logger.debug("Doctype ({}) was found.", doctype.getTitle());
		return doctypeService.findDoctypeByTitle(title);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ApiOperation(value = "Add new doctype", notes = "Returns new doctype")
	public Doctype addNewDoctype(@RequestBody final NewDoctype newDoctype, HttpServletResponse response) {
		if (doctypeService.findDoctypeByTitle(newDoctype.getTitle()) == null) {
			response.setStatus(200);
			logger.debug("Doctype ({}) was added.", newDoctype.getTitle());
			return doctypeService.addDoctype(newDoctype);
		}
		response.setStatus(404);
		logger.debug("Failed to add Doctype ($title{}).", newDoctype.getTitle());
		return null;

	}

	@RequestMapping(path = "/{title}", method = RequestMethod.PUT)
	@ApiOperation(value = "Update existing doctype info", notes = "Returns doctype with new info")
	public Doctype updateDoctype(@PathVariable String title, @RequestBody final NewDoctype newDoctype,
			HttpServletResponse response) {
		Doctype doctype = doctypeService.findDoctypeByTitle(title);
		if (doctype == null) {
			response.setStatus(404);
			logger.debug("Failed to update Doctype ({}).", newDoctype.getTitle());
			return null;
		}
		logger.debug("Doctype ({}) was updated.", newDoctype.getTitle());
		return doctypeService.updateDoctype(title, newDoctype);
	}
}

