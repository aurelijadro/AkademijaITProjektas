// import React, { Component } from 'react';
// import PropTypes from 'prop-types';


// class UserComponent extends Component {
//     render() {
//         return (
//             <div className="container">
//                 <table className="table">
//                     <tbody>
//                         <tr>
//                             <th scope="col">{this.props.id}</th>
//                             <th scope="col">{this.props.username}</th>
//                             <th scope="col">{this.props.name}</th>
//                             <th scope="col">{this.props.surname}</th>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// UserComponent.propTypes = {
//     id: PropTypes.number.isRequired,
//     username: PropTypes.string.isRequired,
//     name: PropTypes.string,
//     surname: PropTypes.string,
// }

// export default UserComponent;

import React from "react";
import { Link } from "react-router-dom";

const UserComponent = props => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.username}</td>
            <td>{props.name}</td>
            <td>{props.surname}</td>
            <td>
                <Link to={"admin/users/edit/" + props.id} className="btn btn-light">
                    Atnaujinti informacija
        </Link>
            </td>
        </tr>
    );
};

export default UserComponent;

