import React, { Component } from 'react';
import './PetInfo.css';

class PetInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: {
                pet_pic_path: '',
                name: '',
                type: '',
                gender: '',
                description: '',
                skill_one: '',
                skill_two: '',
                skill_three: '',
                location: '',
                adopted: false
            },
            removed: false
        }

        this.adoptPet = this.adoptPet.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        this.getPet();

        this.props.socket.on('updatePetInfo', (data) => {
            if (this.mounted) {
              if (data.pet) {
                this.setState({
                  pet: data.pet
                });
              }

              if (data.removed) {
                this.setState({
                  removed: true
                });
              }
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
        const { petId } = this.props.match.params;

        this.props.socket.emit('leavingPet', { petId: petId})
    }

    getPet () {
        const { petId } = this.props.match.params;
        this.props.socket.emit('getPetInfo', { petId: petId });
    }

    adoptPet(event) {
        const { petId } = this.props.match.params;
        this.props.socket.emit('adoptPet', { petId: petId, userId: localStorage.getItem('userId') })
    }

    render() {
        const { pet, removed } = this.state;
        let button;
        if (pet.adopted) {
            button = <button className="btn btn-outline-primary round butt" disabled>Already Adopted</button>
        } else {
            button = <button className="btn btn-outline-primary round butt" onClick={this.adoptPet}>Adopt?</button>
        }

        if (removed) {
            return (
                <div className="padding">
                    <div className="card long shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body removed">
                            <h2>This pet was removed by the owner</h2>
                        </div>
                    </div>
                </div>
            );
        } else {
          return (
              <div className="padding">
                <div className="imgwrapper">
                    <img src={pet.pet_pic_path} alt="pet" className="img-size rounded" />
                </div>
                <div className="card card-length shadow p-3 mb-5 bg-white rounded middle">
                    <span className="all pet-name">{pet.name}</span>
                    <span className="all detail">{pet.type} | {pet.gender}</span>
                    <span className="all detail">Description:</span>                
                    <span className="all detail">{pet.description}</span>                
                    <span className="all detail">Skills:</span>                
                    <span className="all detail">{pet.skill_one}</span>                
                    <span className="all detail">{pet.skill_two}</span>                
                    <span className="all detail">{pet.skill_three}</span>    
                    <div className="center">
                        {button}            
                    </div>
                </div>
              </div>
          );
        }
    }
}

export default PetInfo;
