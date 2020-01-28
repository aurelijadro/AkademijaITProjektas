import React from "react";
import EditFormComponent from "./EditFormComponent,";

const EditFormPresentation = props => {
    return (
        <div className="row">
            <div className="col-12 col-md-8 col-lg-9">
                <EditFormComponent
                    onBack={props.onBack}
                    onChange={props.onChange}
                    onSubmit={props.onSubmit}
                    name={props.name}
                    surname={props.surname}
                    username={props.username}
                    password={props.password}
                />
            </div>
        </div>
    );
};

export default EditFormPresentation;