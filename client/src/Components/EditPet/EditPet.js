import React, { Component } from 'react';
import FormErrors from '../FormErrors/FormErrors.js';
import DatabaseErrors from '../DatabaseErrors/DatabaseErrors.js';
import './EditPet.css';

class EditPet extends Component {
    render() {
        const { petToEdit } = this.props;
        let formIsValid = false;

        if (petToEdit) {
            formIsValid = petToEdit.name.length && petToEdit.type.length && petToEdit.description.length && petToEdit.location.length;
        }

        let submitButton;
        if (formIsValid) {
            submitButton = <input type="submit" className="btn btn-outline-primary round butt" value="Update Pet" />
        } else {
            submitButton = <input type="submit" className="btn btn-outline-primary round butt" value="Update Pet" disabled />
        }

        if (petToEdit) {
            return (
                <div className="edit-pet">
                    <div className="card long shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title">Edit Pet</h5>
                            <hr className="divider" />
                            <form onSubmit={this.props.handleEditPetSubmit}>
                                <div className="panel panel-default">
                                    <FormErrors formErrors={{ name: petToEdit.name, type: petToEdit.type, location: petToEdit.location, description: petToEdit.description }} />
                                    <DatabaseErrors databaseErrors={this.props.databaseErrors} />
                                </div>
                                <input type="text" id="name" name="name" className="form-control signUp" placeholder="pet name" onChange={this.props.handleEditPetChange} value={petToEdit.name} />
                                <input type="text" id="type" name="type" className="form-control signUp" placeholder="pet type" onChange={this.props.handleEditPetChange} value={petToEdit.type} />
                                <select id="gender" name="gender" className="custom-select signUp" onChange={this.props.handleEditPetChange} value={petToEdit.gender}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <input type="text" id="location" name="location" className="form-control signUp" placeholder="city, state" onChange={this.props.handleEditPetChange} value={petToEdit.location} />
                                <input type="text" id="description" name="description" className="form-control signUp" placeholder="description" onChange={this.props.handleEditPetChange} value={petToEdit.description} />
                                <hr className="divider" />
                                <h5>Skills (Optional)</h5>
                                <input type="text" id="skill_one" name="skill_one" className="form-control signUp" placeholder="skill_one" onChange={this.props.handleEditPetChange} value={petToEdit.skill_one} />
                                <input type="text" id="skill_two" name="skill_two" className="form-control signUp" placeholder="skill_two" onChange={this.props.handleEditPetChange} value={petToEdit.skill_two} />
                                <input type="text" id="skill_three" name="skill_three" className="form-control signUp" placeholder="skill_three" onChange={this.props.handleEditPetChange} value={petToEdit.skill_three} />
                                <button type="button" onClick={(event) => this.props.toggleEditPet(null, event)} className="btn btn-outline-warning inline round butt">Cancel</button>
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

export default EditPet;
