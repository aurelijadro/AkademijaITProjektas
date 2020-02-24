import React, { Component } from "react";
import axios from "axios";
import NavigationForAdmin from "../NavigationForAdmin";

class EditGroupFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      titleError: ""
      };
  }

  componentDidMount() {
    this.getGroup();
      }


  getGroup = () => {
    axios
      .get(
        "http://localhost:8081/Gentoo/api/groups/" +
          this.props.match.params.title
      )
      .then(response => {
        this.setState(response.data);
         })
      .catch(error => {
        alert("Nėra galimybės pateikti duomenų apie grupę.");
      });
  };

  onBack = event => {
    event.preventDefault();
    this.props.history.push(`/Gentoo/admin/groups`);
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value }, () => {
      this.validateTitle();
    });
  };



  validateTitle = () => {
    const { title } = this.state;
    this.setState({
      titleError:
        title.length >= 2
          ? null
          : "Grupės pavadinimas turi būti sudarytas iš 2 arba daugiau simbolių"
    });
  };

  onSubmit = event => {
    event.preventDefault();
    axios
      .put(
        "http://localhost:8081/Gentoo/api/groups/" +
          this.props.match.params.title,
        {
          title: this.state.title
        }
      )
      .then(() => {
        alert("Jūs sėkmingai pakeitėte grupės duomenis.");
        this.props.history.push("/Gentoo/admin/groups");
      })
      .catch(function(error) {
        alert("Tokia grupė jau egzistuoja.");
      });
  };

  render() {
    const { title } = this.state;
    const isEnabled =
            title.length >= 2;
      
    return (
      <div>
        <NavigationForAdmin></NavigationForAdmin>
        <div className="container my-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Grupės atnaujinimas</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Pavadinimas:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.titleError ? "is-invalid" : ""
                    }`}
                    name="title"
                    value={title}
                    onChange={this.handleTitleChange}
                    onBlur={this.validateTitle}
                    placeholder="Pavadinimas"
                    required
                  />
                  <div className="invalid-feedback">{this.state.titleError}</div>
                </div>
                {/* <div className="form-group">
                  <label>Pavardė:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.surnameError ? "is-invalid" : ""
                    }`}
                    name="surname"
                    value={surname}
                    onChange={this.handleSurnameChange}
                    onBlur={this.validateSurname}
                    placeholder="Pavardė"
                    required
                  />
                  <div className="invalid-feedback">
                    {this.state.surnameError}
                  </div>
                </div> */}
         
               
                <button
                  className="btn btn-dark"
                  type="submit"
                  disabled={!isEnabled}
                >
                  Pateikti
                </button>
                <button
                  className="btn mx-3 btn-dark"
                  onClick={() => this.props.history.push("/Gentoo/admin/groups")}
                >
                  Atšaukti
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditGroupFormContainer;



//   // onChange = event => {
//   //   event.preventDefault();
//     // const { name, value } = event.target;
//     // let errors = this.state.errors;



//     // this.setState({ errors, [name]: value }, () => {
//     //   console.log(errors);
//     // });


//   onChange = e => {
//     const state = this.state;
//     state[e.target.name] = e.target.value;
//     this.setState(state);
//   };





//   render() {
//     return (
//       <div>
//         <EditGroupFormComponent
//           title={this.state.title}
//           onBack={this.onBack}
//           onSubmit={this.onSubmit}
//           onChange={this.onChange}
//         />
//       </div>
//     );
//   }
// }

// export default EditGroupFormContainer;
