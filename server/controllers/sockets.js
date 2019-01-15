const user = require('../logic/user');
const pet = require('../logic/pet');

module.exports = (io, app) => {
    io.sockets.on('connection', (socket) => {
        console.log('Client connected with id: ' + socket.id);

        // -------------------------- users ------------------------------------------

        //when user attempts to register
        socket.on('registerUser', (data) => {
            user.registerUser(data, (response) => {
                if (response.error) {
                    socket.emit('registerErrors', response);
                } else {
                    socket.emit('updateLoggedIn', { loggedIn: true, userId: response.success });
                }
            });
        });

        //when user attempts to login
        socket.on('loginUser', (data) => {
            user.loginUser(data, (response) => {
                if (response.error) {
                    socket.emit('loginErrors', response);
                } else {
                    socket.emit('updateLoggedIn', { loggedIn: true, userId: response.success });
                }
            });
        });

        // get user info
        socket.on('getUser', (data) => {
            user.findUserById(data.userId, (response) => {
                if (response.error || response.expired) {
                    socket.emit('updateLoggedIn', { loggedIn: false });
                } else {
                    socket.emit('updateUser', response);
                }
            });
        });

        // edit profile info
        socket.on('editProfile', (data) => {
            user.updateProfileInfo(data, data.userId, (response) => {
                if (response.expired) {
                    socket.emit('updateLoggedIn', { loggedIn: false });
                } else {
                    socket.emit('updateUser', response);
                }
            });
        })

        
        //delete user and logout
        socket.on('deleteUser', (data) => {
            user.deleteUserById(data.userId, (response) => {
                if (response.success) {
                    socket.emit('removeLocalStorage');
                    socket.emit('updateLoggedIn', { loggedIn: false });
                }
            });
        });
        
        // ----------------------------- pets -----------------------------------------------
        
        // grab all pets
        socket.on('getPets', () => {
            pet.allPets((response) => {
                if (response.success) {
                    socket.emit('updatePets', response.success);
                }
            });
        });

        // grab three pets
        socket.on('getThreePets', (data) => {
            pet.getThreePets(data, (response) => {
                socket.emit('threePets', response);
            });
        });
        
        // edit pet info
        socket.on('editPet', (data) => {
            pet.updatePet(data, data.userId, (response) => {
                if (response.expired) {
                    socket.emit('updateLoggedIn', { loggedIn: false });
                } else {
                    if (response.success) {
                        socket.emit('updateUserAttribute', response.success);
                        io.to(`${data._id}`).emit('updatePetInfo', { pet: response.pet });
                    }
                    socket.emit('editPet', response);
                }
            });
        });
        
        // filter pets through search
        socket.on('filterPets', (data) => {
            pet.filterPets(data, (response) => {
                socket.emit('updatePets', { pets: response.success });
            });
        });
        
        // remove owned pet
        socket.on('removePet', (data) => {
            pet.deletePet(data, data.userId, (response) => {
                if (response.expired) {
                    socket.emit('updateLoggedIn', { loggedIn: false });
                } else {
                    io.to(`${data.petId}`).emit('updatePetInfo', { removed: true })
                    socket.emit('updateUserAttribute', response.success);
                    
                }
            });
        });
        
        socket.on('getPetInfo', (data) => {
            socket.join(`${data.petId}`);
            pet.findPet(data, (response) => {
                if (response.success) {
                    socket.emit('updatePetInfo', { pet: response.success });
                }
            });
        });
        
        socket.on('leavingPet', (data) => {
            socket.leave(`${data.petId}`);
        });
        
        // create new pet
        app.post('/pet', (req, res) => {
            pet.newPet(req, res, (response) => {
                res.json(response);
            });
        });
        
        // change user profile pic
        app.put('/pet', (req, res) => {
            pet.updatePetPic(req, res, (response) => {
                res.json(response);
            });
        });

        //adopt pet
        socket.on('adoptPet', (data) => {
            pet.adoptPet(data, (response) => {
                io.to(`${data.petId}`).emit('updatePetInfo', { pet: response.pet });
                socket.emit('updateUserAttribute', response.success);
            });
        });
    });
}
