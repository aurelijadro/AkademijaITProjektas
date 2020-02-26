import React from 'react';

const FileListComponent = props => {
    return (
        <div className="col-md-6">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{props.result}</li>
            </ul>
        </div>
    )
}

export default FileListComponent;