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
}
