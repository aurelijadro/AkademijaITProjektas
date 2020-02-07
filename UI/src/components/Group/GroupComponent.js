import React from "react";
import { Link } from "react-router-dom";

const GroupComponent = props => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.title}</td>
            <td>
                <Link to={"groups/edit/" + props.title} className="btn btn-light">
                    Atnaujinti informaciją
        </Link>
            </td>
        </tr>
    );
};

export default GroupComponent;