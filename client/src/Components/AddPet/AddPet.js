import React, { Component } from 'react';
import FormErrors from '../FormErrors/FormErrors.js';
import DatabaseErrors from '../DatabaseErrors/DatabaseErrors.js';
import './AddPet.css';

class AddPet extends Component {
    render() {
        const { addPet, pet } = this.props;
        const formIsValid = pet.name.length && pet.type.length && pet.description.length && pet.location.length;

        let submitButton;
        if (formIsValid) {
            submitButton = <input type="submit" className="btn btn-outline-primary round butt" value="Add Pet" />;
        } else {
            submitButton = <input type="submit" className="btn btn-outline-primary round butt" value="Add Pet" disabled />;
        }

        if (addPet) {
            return (
                <div className="edit-content">
                    <div className="card long shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title username">Add a Pet</h5>
                            <hr className="divider" />
                            <form onSubmit={this.props.handleAddPetSubmit} encType="multipart/form-data">
                                <div className="panel panel-default">
                                    <FormErrors formErrors={{ name: pet.name, type: pet.type, location: pet.location, description: pet.description }} />
                                    <DatabaseErrors databaseErrors={pet.databaseErrors} />
                                </div>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="image" name="image" onChange={this.props.handleAddPetChange} />
                                    <label className="custom-file-label" htmlFor="image">choose your pets picture</label>
                                </div>
                                <input type="text" id="name" name="name" className="form-control signUp" placeholder="pet name" onChange={this.props.handleAddPetChange} value={pet.name} />
                                <input type="text" id="type" name="type" className="form-control signUp" placeholder="pet type" onChange={this.props.handleAddPetChange} value={pet.type} />
                                <select id="gender" name="gender" className="custom-select signUp" onChange={this.props.handleAddPetChange} value={pet.gender}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <input type="text" id="location" name="location" className="form-control signUp" placeholder="city, state" onChange={this.props.handleAddPetChange} value={pet.location} />
                                <input type="text" id="description" name="description" className="form-control signUp" placeholder="description" onChange={this.props.handleAddPetChange} value={pet.description} />
                                <hr className="divider" />
                                <h5>Skills (Optional)</h5>
                                <input type="text" id="skill_one" name="skill_one" className="form-control signUp" placeholder="skill_one" onChange={this.props.handleAddPetChange} value={pet.skill_one} />
                                <input type="text" id="skill_two" name="skill_two" className="form-control signUp" placeholder="skill_two" onChange={this.props.handleAddPetChange} value={pet.skill_two} />
                                <input type="text" id="skill_three" name="skill_three" className="form-control signUp" placeholder="skill_three" onChange={this.props.handleAddPetChange} value={pet.skill_three} />
                                <button type="button" onClick={this.props.toggleAddPet} className="btn btn-outline-warning inline round butt">Cancel</button>
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

export default AddPet;
