import React from "react";
import { Link } from 'react-router-dom';

const AddMainDocumentForm = props => {
    return (
        <div className="container my-4" >
            <div className="panel panel-default" >
                <div className="panel-heading" >
                    <h3 className="panel-title" > Naujo dokumento kūrimas </h3>
                </div>
                <div className="panel-body" >
                    <form onSubmit={props.onSubmit} >
                        <div className="form-group" >
                            <label > Pavadinimas: </label>
                            <input type="text" className="form-control" name="title" onChange={props.onChange} placeholder="Pavadinimas" required />

                        </div>
                        <div className="form-group" >
                            <label > Trumpas aprašymas </label>
                            <textarea className="form-control" name="summary" rows="3" > </textarea>
                        </div >

                    </form>



                </div>
            </div >
        </div >
    );
}

export default AddMainDocumentForm;