import React from 'react';

const FileUploadComponent = props => {
    return (
        <form onSubmit={props.onFormSubmit} >
            <div className="form-group" >
                <label > Prisekite bylas </label>
                <div className="row" > </div>
                <input type="file" onChange={props.onFilesChange} />
                <div >
                    <button id="uploadButton" type="submit" > Įkelti </button>
                </div >
            </div>
        </form >
    )
}

export default FileUploadComponent;