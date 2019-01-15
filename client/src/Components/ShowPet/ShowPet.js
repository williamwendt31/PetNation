import React, { Component } from 'react';
import './ShowPet.css';

class ShowPet extends Component {
    render() {
        const pet = this.props.petToShow;
        if (pet) {
            return (
                <div className="show-pet">
                    <div className="card long shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h4 className="category detail">Pet Details</h4>
                            <hr className="divider" />
                            <h5 className="category detail">Name:</h5>
                            <h6 className="detail">{pet.name}</h6>
                            <h5 className="category detail">Type:</h5>
                            <h6 className="detail">{pet.type}</h6>
                            <h5 className="category detail">Gender:</h5>
                            <h6 className="detail">{pet.gender}</h6>
                            <h5 className="category detail">Location:</h5>
                            <h6 className="detail">{pet.location}</h6>
                            <h5 className="category detail">Description:</h5>
                            <h6 className="detail">{pet.description}</h6>
                            <h5 className="category detail">Skills:</h5>
                            <h6 className="detail">{pet.skill_one}</h6>
                            <h6 className="detail">{pet.skill_two}</h6>
                            <h6 className="detail">{pet.skill_three}</h6>
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default ShowPet;
