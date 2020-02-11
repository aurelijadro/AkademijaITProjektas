package it.akademija.doctype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctypeService {

	@Autowired
	DoctypeEntityRepo doctypeRepo;

	public DoctypeEntity findDoctypeByTitle(String title) {
		return doctypeRepo.findDoctypeByTitle(title);
	}

}
