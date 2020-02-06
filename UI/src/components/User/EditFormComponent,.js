import React from "react";
import { Link } from 'react-router-dom';

const EditFormComponent = props => {
    return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Keisti vartotojo duomenis
        </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={props.onSubmit}>
                        <div className="form-group">
                            <label>Vardas:</label>
                            <input type="text" className="form-control" oninvalid="this.setCustomValidity('Vardas turi būti sudarytas iš 2 arba daugiau simbolių')" pattern=".{2,}"
                                name="name" value={props.name} onChange={props.onChange} placeholder="Vardas" required />

                        </div>
                        <div className="form-group">
                            <label>Pavardė:</label>
                            <input type="text" className="form-control" oninvalid="this.setCustomValidity('Pavardė turi būti sudarytas iš 2 arba daugiau simbolių')" pattern=".{2,}"
                                name="surname" value={props.surname} onChange={props.onChange} placeholder="Pavardė" required />
                        </div>
                        <div className="form-group">
                            <label>Vartotojo vardas:</label>
                            <input type="text" className="form-control" oninvalid="this.setCustomValidity('Vartotojo vardas turi būti sudarytas iš 2 arba daugiau simbolių')" pattern=".{2,}" 
                                name="username" value={props.username} onChange={props.onChange} placeholder="Vartotojo vardas" required />
                        </div>
                        <div className="form-group">
                            <label>Slaptažodis:</label>
                            <input type="password" className="form-control" oninvalid="this.setCustomValidity('Slaptažodis turi būti sudarytas nuo 8 iki 32 simbolių')" pattern=".{8,10}"
                                name="password" value={props.password} onChange={props.onChange} placeholder="********" required />
                        </div>
                        <div className="form-group">
                            <label>
                                Pasirinkite vartotojo prieigos statusą:
                                <select name="role" value={props.role} onChange={props.onChange}>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="USER">USER</option>
                                </select>
                            </label>
                        </div>
                        <button className="btn btn-primary" type="submit">Išsaugoti</button>
                        <Link to="/admin/users"><button className="btn btn-primary" onClick={props.onBack}>Grįžti į vartotojų sąrašą</button></Link>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default EditFormComponent;