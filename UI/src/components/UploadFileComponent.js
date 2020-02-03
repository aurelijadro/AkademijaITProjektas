import React from 'react';

var UploadFileComponent = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group files color">
                        <label>Įkelti dokumentą</label>
                        <input type="file" className="form-control" name="file" onChange={props.onFileChangeHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadFileComponent;