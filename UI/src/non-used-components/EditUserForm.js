// import React, { Component } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import EditFormComponent from './EditFormComponent,';

// class EditUserForm extends Component {
//     constructor() {
//         super();
//         this.state = {
//             name: '',
//             surname: '',
//             username: '',
//             password: '',
//             url: "http://localhost:8080"
//         };
//     }
//     onChange = (e) => {
//         const state = this.state
//         state[e.target.name] = e.target.value;
//         this.setState(state);
//     }
//     onSubmit = (e) => {
//         e.preventDefault();
//         const { name, surname, username, password, url } = this.state;
//         axios.put(`${url}/api/users/${username}`, { name, surname, username, password })
//             .then((result) => {
//                 this.props.history.push("/")
//             });
//     }
//     render() {
//         const { name, surname, username, password } = this.state;
//         return (
//             <EditFormComponent />
//         );
//     }
// }


// export default EditUserForm;