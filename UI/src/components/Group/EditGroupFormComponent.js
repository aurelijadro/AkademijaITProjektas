import React from "react";
import { Link } from 'react-router-dom';

const EditGroupFormComponent = props => {
    return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Keisti grupės duomenis
        </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={props.onSubmit}>
                        <div className="form-group">
                            <label>Grupės pavadinimas:</label>
                            <input type="text" className="form-control" name="title" value={props.title} onChange={props.onChange} placeholder="Pavadinimas" required />
                        </div>
                        <button className="btn btn-primary" type="submit">Išsaugoti</button>
                        <Link to="/admin/groups"><button className="btn btn-primary" onClick={props.onBack}>Grįžti į grupių sąrašą</button></Link>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default EditGroupFormComponent;