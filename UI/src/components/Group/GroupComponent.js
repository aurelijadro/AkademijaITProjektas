import React from "react";
import { Link } from "react-router-dom";

const GroupComponent = props => {
  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td>
        <Link to={"/Gentoo/admin/groups/edit/" + props.id} className="h6">
          {props.title}
        </Link>
      </td>
      <td>
        <Link
          to={`/Gentoo/admin/managegroupusers/${props.id}`}
          className="btn btn-light mx-2"
        >
          Valdyti grupės narius
        </Link>
      </td>
      <td>
        <Link
          to={`/Gentoo/admin/managegroupcreatedocs/${props.id}`}
          className="btn btn-light mx-2"
        >
          Grupės kuriami dokumentų tipai
        </Link>
      </td>
      <td>
        <Link
          to={`/Gentoo/admin/managegroupmoderatedocs/${props.id}`}
          className="btn btn-light mx-2"
        >
          Grupės moderuojami dokumentų tipai
        </Link>
      </td>
    </tr>
  );
};

export default GroupComponent;
