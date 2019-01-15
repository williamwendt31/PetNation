const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');
const User = mongoose.model('User');
const upload = require('../services/uploadImage');

const singleUpload = upload.single('image');

module.exports = {
    allPets: (callback) => {
        Pet.find({}, (err, pets) => {
            if (err) {
                return callback({ error: err });
            } else {
                return callback({ success: { pets: pets }});
            }
        });
    },
    getThreePets: (data, callback) => {
        Pet.find({}, null, { limit: 3 }, (err, pets) => {
            if (err) {
                return callback({ error: err });
            } else {
                return callback({ pets: pets });
            }
        });
    },
    newPet: (req, res, callback) => {
        singleUpload(req, res, (err, some) => {
            if (err) {
                return callback({ error: { image: { message: err.message }}});
            } else {
                if (!req.file) {
                    return callback({ error: { image: { message: 'pet image is required' }}});
                } else if (!req.body.userId) {
                    return callback({ expired: { newConnection: true }});
                } else {
                    var pet = new Pet(req.body);
                    pet.pet_pic_path = req.file.location;
                    pet.adopted = false;
                    pet.save((err) => {
                        if (err) {
                            return callback({ error: err.errors });
                        } else {
                            User.findByIdAndUpdate(req.body.userId, { $push: { owned_pets: pet }}, (err) => {
                                if (err) {
                                    return callback({ error: err.errors });
                                } else {
                                    return callback({ success: 'Successful Pet Creation' });                                        }
                            });
                        }
                    });
                }
            }
        });
    },
    updatePet: (data, userId, callback) => {
        if (!userId) {
            return callback({ expired: { newConnection: true }});
        } else {
            Pet.findById(data._id, (err, pet) => {
                if (err) {
                    return callback({ error: err });
                } else {
                    pet.set(data);
                    pet.save({ runValidators: true }, (err) => {
                        if (err) {
                            return callback({ error: err.errors });
                        } else {
                            User.findOneAndUpdate({ "_id": userId, "owned_pets._id": pet._id }, { $set: { "owned_pets.$": pet }}, { new: true }, (err, user) => {
                                if (err) {
                                    return callback({ error: err });
                                } else {
                                    return callback({ success: { key: 'owned_pets', value: user.owned_pets }, pet: pet });
                                }
                            });
                        }
                    })
                }
            });
        }
    },
    updatePetPic: (req, res, callback) => {
        singleUpload(req, res, (err, some) => {
            if (err) {
                return callback({ error: [{ title: 'Image Upload Error', detail: err.message }]});
            } else {
                Pet.findByIdAndUpdate(req.body.petId, { $set: { pet_pic_path: req.file.location }}, { new: true } ,(err, pet) => {
                    if (err) {
                        return callback({ error: err });
                    } else {
                        User.findOneAndUpdate({ "_id": req.body.userId, "owned_pets._id": pet._id }, { $set: { "owned_pets.$": pet }}, (err) => {
                            if (err) {
                                return callback({ error: err });
                            } else {
                                return callback({ success: 'Successful Pet Pic Update' });
                            }
                        });
                    }
                });
            }
        });
    },
    deletePet: (data, userId, callback) => {
        if (!userId) {
            return callback({ expired: { newConnection: true }});
        } else {
            Pet.findById(data.petId, (err, pet) => {
                if (err) {
                    return callback({ error: err });
                } else {
                    pet.remove((err) => {
                        if (err) {
                            return callback({ error: err });
                        } else {
                            User.findByIdAndUpdate(userId, { $pull: { owned_pets: { _id: pet._id }}}, { new: true }, (err, user) => {
                                if (err) {
                                    return callback({ error: err });
                                } else {
                                    return callback({ success: { key: 'owned_pets', value: user.owned_pets }});
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    findPet: (data, callback) => {
        Pet.findById(data.petId, (err, pet) => {
            if (err) {
                return callback({ error: err });
            } else {
                return callback({ success: pet });
            }
        });
    },
    filterPets: (data, callback) => {
        Pet.find({ $or: [{"type": { "$regex": `${data.query}`, "$options": "i" }}, { "location": { "$regex": `${data.query}`, "$options": "i" }}]}, (err, pets) => {
            if (err) {
                return callback({ error: err });
            } else {
                return callback({ success: pets });
            }
        });
    },
    adoptPet: (data, callback) => {
        Pet.findByIdAndUpdate(data.petId, { adopted: true }, { new: true }, (err, pet) => {
            if (err) {
                return callback({ error: err.errors });
            } else {
                User.findByIdAndUpdate(data.userId, { $push: { adopted_pets: pet }}, { new: true }, (err, user) => {
                    if (err) {
                        return callback({ error: err.errors });
                    } else {
                        return callback({ success: { key: 'adopted_pets', value: user.adopted_pets }, pet: pet });
                    }
                });
            }
        });
    }
}

function isLongEnough(input) {
    return input.length >= 2;
}
