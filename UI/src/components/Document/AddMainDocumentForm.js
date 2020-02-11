import React from "react";
import { Link } from 'react-router-dom';

const AddMainDocumentForm = props => {
    return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Dokumento tipo kūrimas
        </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={props.onSubmit}>
                        <div className="form-group">
                            <label>Pavadinimas:</label>
                            <input type="text" className="form-control"
                                name="title" onChange={props.onChange} placeholder="Pavadinimas" required />

                        </div>

                        <button className="btn btn-primary" type="submit">Išsaugoti</button>
                        <Link to="/admin/doctypes"><button className="btn btn-primary" onClick={props.onBack}>Grįžti į dokumentų tipų sąrašą</button></Link>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default AddMainDocumentFormComponent;