import React, {Component} from "react";

export default class Default extends Component{

render(){
return(
    <div className="container">
        <div className="row">
            <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                <h1>404</h1>
                <h2>Klaida</h2>
                <h3>Puslapis 
                     <span className="text-danger"> {this.props.location.pathname} </span>
                      nerastas</h3>
            </div>
        </div>
    </div>
)
}
}