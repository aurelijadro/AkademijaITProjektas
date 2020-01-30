package it.akademija.doctype;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DoctypeService {

	DoctypeRepository doctypeRepository;

	@Autowired
	public DoctypeService(DoctypeRepository doctypeRepository) {
		this.doctypeRepository = doctypeRepository;
	}
	
	@Transactional
	public List<Doctype> getDoctypes() {
		return doctypeRepository.findAll();
	}
	
	@Transactional
	public Doctype findDoctypeByTitle(String title) {
		return doctypeRepository.findByTitle(title);
	}
	
	@Transactional
	public Doctype addDoctype(NewDoctype newDoctype) {
		Doctype doctype = new Doctype(newDoctype.getTitle());
		return doctypeRepository.save(doctype);
	}
	
	@Transactional
	public Doctype updateDoctype(String title, NewDoctype newDoctype) {
		Doctype existingDoctype = findDoctypeByTitle(title);
		existingDoctype.setTitle(newDoctype.getTitle());
		return existingDoctype;
	}
}
