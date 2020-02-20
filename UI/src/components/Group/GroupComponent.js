import React from "react";
import { Link } from "react-router-dom";

const GroupComponent = props => {
  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td>{props.title}</td>
      <td>
        <Link to={"/Gentoo/groups/edit/" + props.id} className="btn btn-light">
          Atnaujinti informaciją
        </Link>
        <Link
          to={`/Gentoo/admin/managegroupusers/${props.id}`}
          className="btn btn-light mx-2"
        >
          Valdyti grupės narius
        </Link>
        <Link
          to={`/Gentoo/admin/managegroupdocs/${props.id}`}
          className="btn btn-light mx-2"
        >
          Valdyti grupės dokumentų tipus
        </Link>
      </td>
    </tr>
  );
};

export default GroupComponent;
