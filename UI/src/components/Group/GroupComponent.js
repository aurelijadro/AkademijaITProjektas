import React from "react";
import { Link } from "react-router-dom";

const GroupComponent = props => {
  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td>{props.title}</td>
      <td>
        <Link
          to={"/Gentoo/groups/edit/" + props.title}
          className="btn btn-light"
        >
          Atnaujinti informaciją
        </Link>
        <Link
          to={`/Gentoo/admin/users/managegroupusers/${props.title}`}
          className="btn btn-light mx-2"
        >
          Valdyti grupės narius
        </Link>
      </td>
    </tr>
  );
};

export default GroupComponent;
