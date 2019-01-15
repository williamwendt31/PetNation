import React, { Component } from 'react';
import Profile from '../Components/Profile/Profile.js';
import axios from 'axios';

const initialPetState = {
    image: '',
    name: '',
    type: '',
    gender: 'Male',
    description: '',
    skill_one: '',
    skill_two: '',
    skill_three: '',
    location: '',
    databaseErrors: ''
}

class Pet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: initialPetState,
            addPet: false,
            petToEdit: null,
            petToShow: null,
            image: '',
            databaseErrors: ''
        }

        this.toggleAddPet = this.toggleAddPet.bind(this);
        this.handleAddPetChange = this.handleAddPetChange.bind(this);
        this.handleAddPetSubmit = this.handleAddPetSubmit.bind(this);

        this.handlePetPicChange = this.handlePetPicChange.bind(this);

        this.toggleEditPet = this.toggleEditPet.bind(this);
        this.handleEditPetChange = this.handleEditPetChange.bind(this);
        this.handleEditPetSubmit = this.handleEditPetSubmit.bind(this);

        this.toggleShowPet = this.toggleShowPet.bind(this);
        this.removePet = this.removePet.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        this.props.socket.on('editPet', (response) => {
            if (this.mounted) {
              if (response.error) {
                  this.setState({
                      databaseErrors: response.error
                  });
              } else {
                  this.toggleEditPet();
              }
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    resetPetState() {
        this.setState({
            pet: initialPetState
        });
    }

    toggleAddPet() {
        if (this.state.addPet) {
            this.setState({
                addPet: false
            });
        } else {
            this.setState({
                addPet: true
            });
        }
    }

    handleAddPetChange(event) {
        const name = event.target.name;
        let value = null;

        if (name === 'image') {
            value = event.target.files[0];
        } else {
            value = event.target.value;
        }

        this.setState(prevState => ({
            pet: {
                ...prevState.pet,
                [name]: value
            }
        }));
    }

    handleAddPetSubmit(event) {
        event.preventDefault();

        const { image, name, type, gender, description, skill_one, skill_two, skill_three, location } = this.state.pet;
        const formData = new FormData();

        formData.append('userId', localStorage.getItem('userId'));
        formData.append('image', image);
        formData.append('name', name);
        formData.append('type', type);
        formData.append('gender', gender);
        formData.append('description', description);
        formData.append('skill_one', skill_one);
        formData.append('skill_two', skill_two);
        formData.append('skill_three', skill_three);
        formData.append('location', location);


        axios.post('/pet', formData)
        .then((result) => {
            if (this.mounted) {
              if (result.data.error) {
                  this.setState(prevState => ({
                      pet: {
                          ...prevState.pet,
                          databaseErrors: result.data.error
                      }
                  }));
              } else if (result.data.expired) {
                  this.props.getUser(); //try to grab userId again and if fails, will logout user and send to signIn page
              } else {
                  this.toggleAddPet();
                  this.resetPetState();
                  this.props.getUser();
              }
            }
        });
    }

    handlePetPicChange(petId, event) {
        const name = event.target.name;
        const file = event.target.files[0];

        this.setState({
            [name]: file
        }, () => {
            this.submitProfilePic(petId);
        });
    }

    submitProfilePic(petId) {
        const { image } = this.state;
        const formData = new FormData();

        formData.append('image', image);
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('petId', petId);

        axios.put('/pet', formData)
        .then((result) => {
              if (result.data.success && this.mounted) {
                this.props.getUser();
              }
        });
    }

    toggleEditPet(pet, event) {
        this.setState({
            petToEdit: pet
        });
    }

    handleEditPetChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({
            petToEdit: {
                ...prevState.petToEdit,
                [name]: value
            }
        }));
    }

    handleEditPetSubmit(event) {
        event.preventDefault();

        const { _id, name, type, gender, description, skill_one, skill_two, skill_three, location } = this.state.petToEdit;
        this.props.socket.emit('editPet', { _id, name, type, gender, description, skill_one, skill_two, skill_three, location, userId: localStorage.getItem('userId') });
    }

    toggleShowPet(pet, event) {
        if (this.state.petToShow && this.state.petToShow._id === pet._id) { // that pet is already showing
                this.setState({
                    petToShow: null
                });
        } else {
            this.setState({
                petToShow: pet
            });
        }
    }

    removePet(petId, event) {
        this.props.socket.emit('removePet', { petId, userId: localStorage.getItem('userId') });
    }

    render() {
        return (
            <Profile toggleEditInfo={this.props.toggleEditInfo} deleteProfile={this.props.deleteProfile} userData={this.props.userData} handleProfileChange={this.props.handleProfileChange} handleProfileSubmit={this.props.handleProfileSubmit} petData={this.state} toggleAddPet={this.toggleAddPet} handleAddPetChange={this.handleAddPetChange} handleAddPetSubmit={this.handleAddPetSubmit} toggleEditPet={this.toggleEditPet} handleEditPetChange={this.handleEditPetChange} handleEditPetSubmit={this.handleEditPetSubmit} toggleShowPet={this.toggleShowPet} removePet={this.removePet} handlePetPicChange={this.handlePetPicChange} />
        );
    }
}

export default Pet;
