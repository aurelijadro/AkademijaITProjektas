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
        <Link
          to={"/Gentoo/admin/users/edit/" + props.id}
          className="btn btn-light"
        >
          Atnaujinti informaciją
        </Link>
        <Link
          to={"/Gentoo/admin/users/manageusergroups/" + props.id}
          className="btn btn-light mx-2"
        >
          Valdyti grupes
        </Link>
      </td>
    </tr>
  );
};

export default UserComponent;
