package it.akademija.document;

public class NewMainDocument {

	private String title;
	
	private String summary;
	
//	public String url;

	public NewMainDocument(String title
//			, String url
			) {
		this.title = title;
//		this.url = url;
	}

	public NewMainDocument(String title, String summary
//			, String url
			) {
		this.title = title;
		this.summary = summary;
//		this.url = url;
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

//	public String getUrl() {
//		return url;
//	}
//
//	public void setUrl(String url) {
//		this.url = url;
//	}
	
	
}
