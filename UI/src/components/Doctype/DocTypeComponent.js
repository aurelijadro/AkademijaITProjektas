import React from "react";
import { Link } from "react-router-dom";

const DocTypeComponent = props => {
  return (
    <tr>
      <th scope="row">{props.index + 1}</th>
      <td>
        <Link to={"/Gentoo/admin/doctypes/edit/" + props.id} className="h5">
          {props.title}
        </Link>
      </td>
      <td>
        <Link
          className="btn btn-light"
          to={`/Gentoo/admin/managecreatabledoctypegroups/${props.id}`}
        >
          Valdyti grupių leidimus kurti
        </Link>
      </td>
      <td>
        <Link
          className="btn btn-light"
          to={`/Gentoo/admin/managecreatabledoctypegroups/${props.id}`}
        >
          Valdyti grupių leidimus moderuoti
        </Link>
      </td>
    </tr>
  );
};

export default DocTypeComponent;
