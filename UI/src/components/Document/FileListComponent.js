import React from 'react';

const FileListComponent = props => {
    return (
        <div className="col-md-6">
            <ul>
                <li>{props.result}</li>
            </ul>
        </div>
    )
}

export default FileListComponent;