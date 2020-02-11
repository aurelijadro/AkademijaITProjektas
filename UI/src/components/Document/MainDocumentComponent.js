import React from "react";
import { Link } from "react-router-dom";

const MainDocumentComponent = props => {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.title}</td>
      <td>{props.summary}</td>
      <td>
        <Link
          to={"/Gentoo/documents/edit/" + props.id}
          className="btn btn-light"
        >
          Koreguoti
        </Link>
      </td>
    </tr>
  );
};

export default MainDocumentComponent;
