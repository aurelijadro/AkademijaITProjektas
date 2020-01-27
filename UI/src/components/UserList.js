import React from 'react';
import PropTypes from 'prop-types';
import UserComponent from './UserComponent';

var UserList = (props) => {
    var user = props.users.map((user, index) => {
        // console.log(product.id)
        return (
            <UserComponent
                key={index}
                id={user.id}
                username={user.username}
                name={user.name}
                surname={user.surname}
            />
        );
    });
    return (<div className="row">{user}</div>);
};

UserList.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserList;