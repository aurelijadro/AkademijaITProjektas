package it.akademija.document;

public class DocumentDTO {

	private String author;
	private String doctype;
	private String title;
	private String summary;
	private String submissionDate;
	private String approvalDate;
	private String rejectionDate;
	private String rejectionReason;
	private String approver;

	public DocumentDTO(MainDocument document) {
		super();
		this.author = document.getUser().getName() + " " + document.getUser().getSurname();
		this.doctype = document.getDoctypes().getTitle();
		this.title = document.getTitle();
		this.summary = document.getSummary();
		this.submissionDate = submissionDate;
		this.approvalDate = approvalDate;
		this.rejectionDate = rejectionDate;
		this.rejectionReason = rejectionReason;
		this.approver = approver;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDoctype() {
		return doctype;
	}

	public void setDoctype(String doctype) {
		this.doctype = doctype;
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

	public String getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(String submissionDate) {
		this.submissionDate = submissionDate;
	}

	public String getApprovalDate() {
		return approvalDate;
	}

	public void setApprovalDate(String approvalDate) {
		this.approvalDate = approvalDate;
	}

	public String getRejectionDate() {
		return rejectionDate;
	}

	public void setRejectionDate(String rejectionDate) {
		this.rejectionDate = rejectionDate;
	}

	public String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	public String getApprover() {
		return approver;
	}

	public void setApprover(String approver) {
		this.approver = approver;
	}

}
