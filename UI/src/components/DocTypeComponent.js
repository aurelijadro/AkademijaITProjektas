import React from "react";
import { Link } from "react-router-dom";

const DocTypeComponent = props => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.title}</td>
            <td>
                <Link to={"admin/doctypes/edit/" + props.id} className="btn btn-light">
                    Atnaujinti informaciją
        </Link>
            </td>
        </tr>
    );
};

export default DocTypeComponent;