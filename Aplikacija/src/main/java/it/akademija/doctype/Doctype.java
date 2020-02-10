package it.akademija.doctype;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import it.akademija.newGroup.GroupClass;

@Entity
public class Doctype {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@NotNull
	@Length(min = 1, max = 100)
	private String title;
	
//	@ManyToMany
//	@JoinTable(name="UsersGroup_Doctype", joinColumns=@JoinColumn(name="Doctype_ID"), inverseJoinColumns=@JoinColumn(name="UsersGroup_ID"))
//	private List<UsersGroup> groups;
	
	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "doctype_group",
        joinColumns = @JoinColumn(name = "doctype_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"))
    private Set<GroupClass> groupSet;

    public Doctype(String title, Set<GroupClass> groupSet) {
        this.title = title;
        this.groupSet = groupSet;
    }

	public Doctype() {
	}

	public Doctype(String title) {
		this.title = title;
	}

	public Doctype(Long id, String title) {
		this.id = id;
		this.title = title;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Set<GroupClass> getGroupSet() {
		return groupSet;
	}

	public void setGroupSet(Set<GroupClass> groupSet) {
		this.groupSet = groupSet;
	}
	
	public void addGroup(GroupClass group) {
		this.groupSet.add(group);
		group.getDoctypeSet().add(this);
	}
	
	public void removeGroup(GroupClass group) {
		this.groupSet.remove(group);
		group.getDoctypeSet().remove(this);
	}
	

//	public void addGroup(UsersGroup group) {
//		this.groups.add(group);
//	}
//
//	public List<UsersGroup> getGroups() {
//		return groups;
//	}
//
//	public void setGroups(List<UsersGroup> groups) {
//		this.groups = groups;
//	}

}
