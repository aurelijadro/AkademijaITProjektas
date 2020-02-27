import React, { Component } from 'react';

class DoctypeSelect extends Component {
    constructor() {
        super();
    }

    render() {
        let doctypes = this.props.state.doctypes;
        let doctype = doctypes.map((doctype) =>
            <option key={doctype.id}>{doctype.title}</option>
        );

        return (
            <div>
                <select>
                    {doctype}
                </select>
            </div>
        )
    }
}

export default DoctypeSelect;
