import React, { Component } from 'react';
import App from '../Components/App/App.js';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        if (localStorage.getItem('userId')) {
            if (this.mounted) {
              this.setState({
                  isLoggedIn: true
              });
            }
        }

        socket.on('updateLoggedIn', (response) => {
            if (this.mounted) {
              this.setState({
                  isLoggedIn: response.loggedIn
              });
            }

            if (response.userId) {
              localStorage.setItem('userId', response.userId);
            }
        });

        socket.on('removeLocalStorage', () => {
            localStorage.clear();
        });

        socket.on('error', (err) => {
            console.log(err);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    logout() {
        localStorage.clear();
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        return (
            <App isLoggedIn={this.state.isLoggedIn} logout={this.logout} socket={socket} />
        );
    }
}

export default Authentication;
