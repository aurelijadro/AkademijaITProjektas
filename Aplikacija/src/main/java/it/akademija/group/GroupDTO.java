//package it.akademija.group;
//
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import it.akademija.doctype.Doctype;
//
//public class GroupDTO {
//	
//	private Long id;
//	
//	private String title;
//	
//	private String[] doctypeList;
//
//	@JsonIgnore
//	private List<Doctype> doctypeListArray;
//
//	public GroupDTO(UsersGroup usersGroup) {
//		this.id = usersGroup.getId();
//		this.title = usersGroup.getTitle();
//		this.doctypeList = getDoctypeList();
//		this.doctypeListArray = usersGroup.getDoctypes();
//	}
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getTitle() {
//		return title;
//	}
//
//	public void setTitle(String title) {
//		this.title = title;
//	}
//
//	public String[] getDoctypeList() {
//		String[] doctypeList = new String[doctypeListArray.size()];
//		for (int i = 0; i < doctypeListArray.size(); i++) {
//			doctypeList[i] = doctypeListArray.get(i).getTitle();
//		}
//		return doctypeList;
//	}
//
//	public void setDoctypeList(String[] doctypeList) {
//		this.doctypeList = doctypeList;
//	}
//
//	public List<Doctype> getDoctypeListArray() {
//		return doctypeListArray;
//	}
//
//	public void setDoctypeListArray(List<Doctype> doctypeListArray) {
//		this.doctypeListArray = doctypeListArray;
//	}
//
//}
