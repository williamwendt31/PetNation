import React, { Component } from 'react';
import 'react-router';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../Footer/Footer.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: []
        };
    }

    componentDidMount() {
        this.mounted = true;

        this.getPets();

        this.props.socket.on('threePets', (data) => {
            if (data.pets && this.mounted) {
                this.setState({
                    pets: data.pets
                });
            }
        });
    }

    getPets() {
        this.props.socket.emit('getThreePets');
    }

    componentWillUnmount() {
        this.mounted = false;
    }


    render() {
        const { pets } = this.state;
        return (
            <div className="main">
                <img src="/cat.jpg" className="img-fluid width d-none d-md-block" alt="background" />
                <div className="sub-content">
                    <h3 className="subtitle">Pets that Still Need a Home</h3>
                    <div className="container-fluid options">
                        <div className="row">
                            {pets.map((pet, index) => {
                                return (
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={index}>
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
                </div>
                <div className="sub-content white-back">
                    <h3 className="subtitle">Planning to Adopt a Pet?</h3>
                    <div className="container-fluid options">
                        <div className="row">
                            <div className="col-sm-12 col-md-4 up">
                                <i className="material-icons main-icons">check_circle</i>
                                <h4 className="category-title">Pet Statistics</h4>
                                <p className="caption">Facts and Statistics on Pet Adoption and Animal Shelters</p>
                                <p className="caption">ASPCA</p>
                                <a href="https://www.aspca.org/animal-homelessness/shelter-intake-and-surrender/pet-statistics" className="btn btn-outline-primary round butt">Learn More</a>
                            </div>
                            <div className="col-sm-12 col-md-4 up">
                                <i className="material-icons main-icons">gavel</i>
                                <h4 className="category-title">State Laws</h4>
                                <p className="caption">Get Familiar with State Laws Regarding Exotic Animals</p>
                                <p className="caption">Born Free USA</p>
                                <a href="https://www.bornfreeusa.org/campaigns/animals-in-captivity/summary-state-laws-exotic-animals/" className="btn btn-outline-primary round butt">Learn More</a>
                            </div>
                            <div className="col-sm-12 col-md-4 up">
                                <i className="material-icons main-icons">info</i>
                                <h4 className="category-title">About Us</h4>
                                <p className="caption">Some Interesting Facts About Us and Why We Do It</p>
                                <p className="caption">We Love All Animals!</p>
                                <a href="https://www.bornfreeusa.org/campaigns/animals-in-captivity/summary-state-laws-exotic-animals/" className="btn btn-outline-primary round butt">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;