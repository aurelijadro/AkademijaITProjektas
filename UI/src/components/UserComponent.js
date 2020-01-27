import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserComponent extends Component {
    render() {
        return (
            <div className="container">
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">{this.props.id}</th>
                            <td>{this.props.username}</td>
                            <td>{this.props.name}</td>
                            <td>{this.props.surname}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

UserComponent.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    surname: PropTypes.string,
}

export default UserComponent;

