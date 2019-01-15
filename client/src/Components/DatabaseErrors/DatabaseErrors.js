import React, { Component } from 'react';

class DatabaseErrors extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.databaseErrors).map((fieldName, i) => {
                    return ( 
                    <p className="alert alert-danger" key={i}>{this.props.databaseErrors[fieldName].message}</p>
                    );
                })}
            </div>
        )
    }
}

export default DatabaseErrors;