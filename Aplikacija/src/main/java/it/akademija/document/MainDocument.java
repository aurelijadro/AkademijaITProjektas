package it.akademija.document;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.akademija.doctype.DoctypeEntity;
import it.akademija.user.User;

@Entity
public class MainDocument {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true)
	private Long id;

	private Long creatorId;

	private String title;

	private String summary;

	private String documentStatus = "Sukurtas";

	private LocalDate submissionDate = null;

	private LocalDate approvalDate = null;

	private LocalDate rejectionDate = null;

	private Long approverId;

	private String rejectionReason;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	@ManyToOne(cascade = { CascadeType.MERGE, CascadeType.DETACH })
	@JoinColumn(name = "doctype_id")
	private DoctypeEntity doctypes;

	public MainDocument() {
	}

	public MainDocument(String title, String summary) {
		this.title = title;
		this.summary = summary;
	}

	public MainDocument(Long id, String title, String summary) {
		this.id = id;
		this.title = title;
		this.summary = summary;
	}

	public MainDocument(Long id, String title, String summary, String documentStatus, LocalDate submissionDate) {
		this.id = id;
		this.title = title;
		this.summary = summary;
		this.documentStatus = documentStatus;
		this.submissionDate = submissionDate;
	}

	public MainDocument(Long id, Long creatorId, String title, String summary, String documentStatus,
			LocalDate submissionDate, LocalDate approvalDate, LocalDate rejectionDate, Long approverId,
			String rejectionReason) {
		this.id = id;
		this.creatorId = creatorId;
		this.title = title;
		this.summary = summary;
		this.documentStatus = documentStatus;
		this.submissionDate = submissionDate;
		this.approvalDate = approvalDate;
		this.rejectionDate = rejectionDate;
		this.approverId = approverId;
		this.rejectionReason = rejectionReason;
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

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public DoctypeEntity getDoctypes() {
		return doctypes;
	}

	public void setDoctypes(DoctypeEntity doctypes) {
		this.doctypes = doctypes;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void removeUser(User user) {
		user.removeDocument(this);
	}

	public String getDocumentStatus() {
		return documentStatus;
	}

	public void setDocumentStatus(String documentStatus) {
		this.documentStatus = documentStatus;
	}

	public String updateDocumentStatusToSubmitted() {
		return this.documentStatus = "Pateiktas";
	}

	public String updateDocumentStatusToApproved() {
		return this.documentStatus = "Patvirtintas";
	}

	public String updateDocumentStatusToDenied() {
		return this.documentStatus = "Atmestas";
	}

	public LocalDate getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate() {
		this.submissionDate = LocalDate.now();
	}

	public LocalDate getApprovalDate() {
		return approvalDate;
	}

	public void setApprovalDate() {
		this.approvalDate = LocalDate.now();
	}

	public LocalDate getRejectionDate() {
		return rejectionDate;
	}

	public void setRejectionDate() {
		this.rejectionDate = LocalDate.now();
	}

	public String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	public Long getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Long creatorId) {
		this.creatorId = creatorId;
	}

	public Long getApproverId() {
		return approverId;
	}

	public void setApproverId(Long approverId) {
		this.approverId = approverId;
	}

}
