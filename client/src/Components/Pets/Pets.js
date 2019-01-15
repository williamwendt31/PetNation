import React, { Component } from 'react';
import './Pets.css';
import 'react-router';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer.js';

class Pets extends Component {
    render() {
        const { pets } = this.props;
        return(
            <div className="pets-container">
                <div className="container-fluid">
                    <div className="row search-bar">
                        <form className="mr-auto search">
                            <input className="form-control mr-sm-2 search-input" type="text" id="query" name="query" placeholder="Search Type or Location" onChange={this.props.handleSearchChange} />
                            <button className="btn btn-outline-success btn-rounded my-0" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="row all-pets">
                        {pets.map((pet, index) => {
                            return (
                                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                    <div className="image-flip">
                                        <div className="mainflip">
                                            <div className="frontside">
                                                <div className="card shadow">
                                                    <div className="card-body text-center">
                                                        <p><img className=" img-fluid" src={pet.pet_pic_path} alt="card" /></p>
                                                        <h3 className="card-title">{pet.name}</h3>
                                                        <p className="card-text">{pet.location}</p>
                                                        <p className="card-text">{pet.type}</p>
                                                        <Link to={`/pet/${pet._id}`} className="btn btn-outline-success round butt">See Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Pets;
