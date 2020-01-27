import React from "react";
import { Link } from "react-router-dom";

const GroupComponent = props => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.title}</td>
            <td>
                <Link to={"admin/groups/edit/" + props.id} className="btn btn-light">
                    Atnaujinti informaciją
        </Link>
            </td>
        </tr>
    );
};

export default GroupComponent;