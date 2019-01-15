import React, { Component } from 'react';
import Pet from './Pet.js';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                owned_pets: [],
                adopted_pets: []
            },
            databaseErrors: '',
            editInfo: false
        };

        this.toggleEditInfo = this.toggleEditInfo.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.handleProfileChange = this.handleProfileChange.bind(this);
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        this.getUser();

        this.props.socket.on('updateUserAttribute', (data) => {
            if (this.mounted) {
              this.setState(prevState => ({
                  user: {
                      ...prevState.user,
                      [data.key]: data.value
                  }
              }));
            }
        });

        this.props.socket.on('updateUser', (data) => {
            if (this.mounted) {
              if (data.success) {
                  this.setState({
                      user: data.success.user,
                      databaseErrors: ''
                  }, () => {
                      if (this.state.editInfo) {
                          this.toggleEditInfo();
                      }
                  });
              } else {
                  this.setState({
                      databaseErrors: data.error
                  });
              }
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getUser() {
        this.props.socket.emit('getUser', { userId: localStorage.getItem('userId') });
    }

    handleProfileChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }

    handleProfileSubmit(event) {
        event.preventDefault();
        const { username, email } = this.state.user;

        this.props.socket.emit('editProfile', { username, email, userId: localStorage.getItem('userId') });
    }

    toggleEditInfo() {
        if (this.state.editInfo) {
            this.setState({
                editInfo: false
            });
        } else {
            this.setState({
                editInfo: true
            });
        }
    }

    deleteProfile() {
        this.props.socket.emit('deleteUser', { userId: localStorage.getItem('userId') });
    }

    render() {
        return (
            <Pet toggleEditInfo={this.toggleEditInfo} deleteProfile={this.deleteProfile} userData={this.state} handleProfileChange={this.handleProfileChange} handleProfileSubmit={this.handleProfileSubmit} getUser={this.getUser} socket={this.props.socket} />
        );
    }
}

export default User;
