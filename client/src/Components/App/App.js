import React, { Component } from 'react';
import Home from '../Home/Home.js';
import SignIn from '../SignIn/SignIn.js';
import SignUp from '../SignUp/SignUp.js';
import User from '../../Containers/User.js';
import Pets from '../../Containers/Pets.js';
import PetInfo from '../PetInfo/PetInfo.js';
import './App.css';
import 'react-router';
import {
    BrowserRouter,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

class App extends Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        let link;
        let secLink;
        if (!isLoggedIn) {
            link = <li className="nav-item"><Link to="/signUp" className="nav-link">Sign Up</Link></li>
            secLink = <li className="nav-item"><Link to="/signIn" className="nav-link">Sign In</Link></li>
        } else {
            link = <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
            secLink = <li className="nav-item"><button onClick={this.props.logout} className="btn btn-outline-danger my-2 my-sm-0 left">Logout</button></li>
        }
        return (
            <BrowserRouter>
                <div className="navigation">
                    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                        <Link to="/" className="navbar-brand d-none d-md-block">PetNation</Link>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pets" className="nav-link">Pets</Link>
                            </li>
                            {link}
                            {secLink}
                        </ul>
                    </nav>
                    <Route exact path="/" render={(props) => <Home {...props} socket={this.props.socket} /> } />
                    <Route path="/signUp" render={(props) => isLoggedIn ? ( <Redirect to="/" /> ) : ( <SignUp {...props} socket={this.props.socket} /> ) } />
                    <Route path="/signIn" render={(props) => isLoggedIn ? ( <Redirect to="/" /> ) : ( <SignIn {...props} socket={this.props.socket} /> ) } />
                    <Route path="/pet/:petId" render={(props) => isLoggedIn ? ( <PetInfo {...props} socket={this.props.socket} /> ) : ( <Redirect to="/signIn" /> ) } />
                    <Route path="/pets" render={(props) => <Pets {...props} isLoggedIn={this.props.isLoggedIn} socket={this.props.socket} /> } />
                    <Route path="/profile" render={(props) => isLoggedIn ? ( <User {...props} socket={this.props.socket} /> ) : ( <Redirect to="/signIn" /> ) } />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;