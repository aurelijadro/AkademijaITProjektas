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
                        <div className="form-group" >
                            <label > Pasirinkite dokumento tipą:
        <select name="role" value="role" onChange={props.handleChange} >
                                    <option value="USER" > USER </option>
                                    <option value="ADMIN" > ADMIN </option>
                                </select >
                            </label>
                        </div >
                    </form>
                    <form onSubmit={props.onFormSubmit} >
                        <div className="form-group" >
                            <label > Prisekite bylas </label>
                            <div className="row" > </div>
                            <input type="file" onChange={props.onChange} />
                            <div >
                                <button id="uploadButton" type="submit" > Įkelti </button>
                            </div >
                        </div>
                    </form >

                    <button className="btn btn-dark" type="submit" > Išsaugoti </button>
                </div>
            </div >
        </div >
    );
}

export default AddMainDocumentForm;