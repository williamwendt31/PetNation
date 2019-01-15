import React, { Component } from 'react';
import PetsPage from '../Components/Pets/Pets.js';

class Pets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            query: '',
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.props.socket.emit('getPets');

        this.props.socket.on('updatePets', (data) => {
            if (this.mounted) {
                this.setState({
                    pets: data.pets
                });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleSearchChange(event) {
        const value = event.target.value;
        if (value !== '') {
            this.setState({
                query: value
            }, () => {
                this.filterPets();
            });
        }
    }

    filterPets() {
        const  { query } = this.state

        this.props.socket.emit('filterPets', { query: query });
    }

    render() {
        return (
            <PetsPage pets={this.state.pets} isLoggedIn={this.props.isLoggedIn} handleSearchChange={this.handleSearchChange} socket={this.props.socket} />
        );
    }
}

export default Pets;
