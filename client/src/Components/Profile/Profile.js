import React, { Component } from 'react';
import EditProfile from '../EditProfile/EditProfile.js';
import AddPet from '../AddPet/AddPet.js';
import ShowPet from '../ShowPet/ShowPet.js';
import EditPet from '../EditPet/EditPet.js';

import './Profile.css';

class Profile extends Component {
    render() {
        const { user, editInfo } = this.props.userData;
        const { pet, addPet, petToEdit, petToShow } = this.props.petData;
        return (
            <div className="profile-content">
                <img src="/bird.jpg" alt="background" className="img-fluid d-none d-md-block" />
                <div className="container-fluid bio">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <div className="card long shadow p-3 mb-5 bg-white rounded">
                                <div className="card-body">
                                    <h4 className="card-title username">{user.username}</h4>
                                    <h4 className="card-title d-none d-md-block">{user.email}</h4>
                                    <h4 className="card-title buttons">
                                        <button onClick={this.props.toggleEditInfo} className="btn btn-link purple round butt">Edit</button>
                                        <button onClick={this.props.deleteProfile} className="btn btn-link purple round butt">Delete</button>
                                    </h4>
                                    <h4 className="card-text cat">Up For Adoption<button onClick={this.props.toggleAddPet} className="btn btn-outline-info round butt add">Add Pet</button></h4>
                                    <ul className="list-group list-group-flush">
                                    {user.owned_pets.map((pet, index) => {
                                          return (
                                              <li className="list-group-item" key={index}>
                                                  <p className="pet-info">
                                                      <img src={pet.pet_pic_path} alt="pet" className="rounded-circle pet-picture d-none d-md-inline-block" />
                                                      {pet.name}
                                                      <span className="actions">
                                                        <label className="btn btn-link round purple butt margin-right btn-file">
                                                            Change Pic <input type="file" id="image" name="image" onChange={(event) => this.props.handlePetPicChange(pet._id, event)} />
                                                        </label>
                                                          <button type="button" className="btn btn-link purple round butt details profile" onClick={(event) => this.props.toggleShowPet(pet, event)}>See Details</button>
                                                          <button type="button" className="btn btn-link purple round butt profile" onClick={(event) => this.props.toggleEditPet(pet, event)}>Edit</button>
                                                          <button type="button" className="btn btn-link purple round butt remove profile" onClick={(event) => this.props.removePet(pet._id, event)}>Remove</button>
                                                      </span>
                                                  </p>
                                                </li>
                                          );
                                    })}
                                    </ul>
                                    <h4 className="card-text cat">Adopted Pets</h4>
                                    <ul className="list-group list-group-flush">
                                    {user.adopted_pets.map((pet, index) => {
                                          return (
                                              <li className="list-group-item" key={index}>
                                                  <p className="pet-info">
                                                      <img src={pet.pet_pic_path} alt="pet" className="rounded-circle pet-picture d-none d-md-inline-block" />
                                                      {pet.name}
                                                      <span className="actions">
                                                          <button type="button" className="btn btn-link purple round butt details" onClick={(event) => this.props.toggleShowPet(pet, event)}>See Details</button>
                                                      </span>
                                                  </p>
                                              </li>
                                          );
                                    })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                            <ShowPet petToShow={petToShow} />
                            <EditPet petToEdit={petToEdit} toggleEditPet={this.props.toggleEditPet} handleEditPetChange={this.props.handleEditPetChange} handleEditPetSubmit={this.props.handleEditPetSubmit} databaseErrors={this.props.petData.databaseErrors} />
                            <EditProfile toggleEditInfo={this.props.toggleEditInfo} editInfo={editInfo} handleProfileChange={this.props.handleProfileChange} handleProfileSubmit={this.props.handleProfileSubmit} user={user} databaseErrors={this.props.userData.databaseErrors} />
                            <AddPet toggleAddPet={this.props.toggleAddPet} addPet={addPet} handleAddPetChange={this.props.handleAddPetChange} handleAddPetSubmit={this.props.handleAddPetSubmit} pet={pet} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
