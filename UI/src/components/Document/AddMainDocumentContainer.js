// import React, {
//     Component
// } from "react";
// import axios from "axios";
// import AddMainDocumentForm from './AddMainDocumentForm';
// import ApiUrl from "../../APIURL";
// import FileListComponent from './FileListComponent';
// import FileUploadComponent from "./FileUploadComponent";

// class AddMainDocumentContainer extends Component {
//     constructor() {
//         super();
//         this.state = {
//             documentId: "",
//             title: "",
//             summary: "",
//             doctypes: [{
//                 id: "",
//                 title: "",
//             }],
//             doctypeId: "",
//             file: null,
//             results: [],
//             userId: ""
//         };
//         console.log(this.state.userId)
//         console.log(this.state.doctypes)
//         console.log(this.state.results)
//     }

//     getUserId = () => {
//         axios
//             .get(`${ApiUrl}loggedUserId`)
//             .then(response => {
//                 console.log(response)
//                 this.setState({ userId: response.data });
//             })
//             .catch(error => {
//                 alert("Tokio vartotojo nera arba jis neprisijunges.")
//             })
//     };

//     componentDidMount() {
//         this.getDoctypes();
//         this.getUserId();
//     }

//     getDoctypes = (event) => {
//         axios
//             .get(`${ApiUrl}doctypes`)
//             .then(response => {
//                 this.setState({ doctypes: response.data });
//             })
//             .catch(error => {

//             })
//     }

//     onChange = event => {
//         this.setState({ [event.target.name]: event.target.value });

//     };

//     handleChange = (event, data) => {
//         this.setState({ doctypes: data.value });
//     }


//     addNewDocument = event => {
//         event.preventDefault();
//         axios
//             .post(`${ApiUrl}documents/${this.state.userId}`)
//             .then(response => {
//                 console.log(response)
//                 alert('Jus sukuret.')
//             })
//             .catch(error => {

//             });
//     }

//     onFilesChange = event => {
//         this.setState({ file: event.target.files[0] });
//     }

//     onFormSubmit = (e) => {
//         e.preventDefault();
//         const data = new FormData()
//         data.append("file", this.state.file)
//         axios
//             .post(`${ApiUrl}files/${this.state.userId}/${this.state.documentId}/uploadFile`, data)
//             .then((response) => {
//                 axios.get(`${ApiUrl}files/${this.state.userId}/${this.state.documentId}/uploadedFilesNames`)
//                     .then(response => {
//                         this.setState({ results: response.data });
//                         console.log(this.state.results)
//                     })
//                     .catch(error => {
//                         alert("Kuriant dokumentą būtina pridėti bent vieną bylą.")
//                     });
//             })
//             .catch((error) => {
//                 alert("You haven't uploaded any files, please try again.")
//             })
//     }

//     // onSubmit = event => {
//     //     event.preventDefault();
//     //     const data = {
//     //         title: this.state.title,
//     //         summary: this.state.summary,
//     //     };
//     //     axios
//     //         .post(`${ApiUrl}groups`, data)
//     //         .then(response => {
//     //             alert("Jūs sėkmingai sukūrėte grupę: " + this.state.title);
//     //             this.props.history.push("/Gentoo/admin/groups");
//     //         })
//     //         .catch(error => {
//     //             alert("Grupės sukurti nepavyko.");
//     //         });
//     //     event.preventDefault();
//     // };

//     astaMethod = (event) => {
//         console.log(event)
//         // this.setState({ value: data.value });
//     }


//     render() {
//         let result = this.state.results.map((result, index) => {
//             return <FileListComponent key={index} result={result} />;
//         });
//         return (
//             <div className="container">
//                 <div className="container my-4" >
//                     <div className="panel panel-default" >
//                         <div className="panel-heading" >
//                             <h3 className="panel-title" > Naujo dokumento kūrimas </h3>
//                         </div>
//                         <div className="panel-body" >
//                             <form onSubmit={this.addNewDocument} >
//                                 <div className="form-group" >
//                                     <label > Pavadinimas: </label>
//                                     <input type="text" className="form-control" name="title" onChange={this.onChange} placeholder="Pavadinimas" required />

//                                 </div>
//                                 <div className="form-group" >
//                                     <label > Trumpas aprašymas </label>
//                                     <textarea className="form-control" name="summary" rows="3" > </textarea>
//                                 </div >


//                                 <button className="btn-dark" type="submit">Patvirtinti</button>
//                             </form>


//                         </div>
//                     </div >
//                 </div >

//                 {/* <div className="form-group" >
//                     <label > Pasirinkite dokumento tipą:
//                         <select
//                             onChange={this.onChange} value={this.state.value}>
//                             {this.state.doctypes.map((doctype) => {
//                                 return (<option key={doctype.id} value={doctype.title}>{doctype.title}</option>);
//                             })}
//                         </select>
//                     </label>
//                 </div > */}





//                 <FileUploadComponent />

//                 <h3 id="upload"> Jūs pridėjote šias bylas: </h3>
//                 {result}

//                 <button className="btn btn-dark" type="submit" > Išsaugoti </button>

//             </div>

//         );
//     }
// }

// export default AddMainDocumentContainer;