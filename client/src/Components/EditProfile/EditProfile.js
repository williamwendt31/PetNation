import React, { Component } from 'react';
import FormErrors from '../FormErrors/FormErrors.js';
import DatabaseErrors from '../DatabaseErrors/DatabaseErrors.js';
import './EditProfile.css';

class EditProfile extends Component {
    render() {
        const { editInfo, user } = this.props;
        const formIsValid = user.username.length && user.email.length;

        let submitButton;
        if (formIsValid) {
            submitButton = <input type="submit" className="btn btn-outline-primary round butt" value="Update" />;
        } else {
            submitButton = <input type="submit" className="btn btn-outline-primary round butt" value="Update" disabled />;
        }

        if (editInfo) {
            return (
                <div className="edit-content">
                    <div className="card long shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title username">Edit Profile Info</h5>
                            <hr className="divider" />
                            <form onSubmit={this.props.handleProfileSubmit}>
                                <div className="panel panel-default">
                                    <FormErrors formErrors={{username: user.username, email: user.email}} />
                                    <DatabaseErrors databaseErrors={this.props.databaseErrors} />        
                                </div>
                                <input type="text" id="username" name="username" className="form-control signUp" placeholder="username" onChange={this.props.handleProfileChange} value={user.username} />
                                <input type="text" id="email" name="email" className="form-control signUp" placeholder="email" onChange={this.props.handleProfileChange} value={user.email} />
                                <button type="button" onClick={this.props.toggleEditInfo} className="btn btn-outline-warning inline round butt">Cancel</button>
                                {submitButton}
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default EditProfile;