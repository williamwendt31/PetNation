import React, { Component } from 'react';

class FormErrors extends Component {
    render() {
        return(
            <div>
                {Object.keys(this.props.formErrors).map((fieldName, i) => {
                    if (!this.props.formErrors[fieldName] || !this.props.formErrors[fieldName].length) {
                        return (
                            <p className="alert alert-danger" key={i}>{fieldName} is required</p>
                        )
                    } else {
                        return '';
                    }
                })}
            </div>
        );
    }
}

export default FormErrors;