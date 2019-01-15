const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');
const upload = require('../services/uploadImage');

const singleUpload = upload.single('image');

module.exports = {
    registerUser: (data, callback) => {
        if (!isPasswordsMatch(data.password, data.password_confirmation)) { // error check before it hits models
            return callback({ error: { password: { message: 'password and password confirmation must match' }}});
        } else if (!isPasswordLongEnough(data.password)) {
            return callback({ error: { password: { message: 'password must be at least 8 characters' }}});
        } else {
            User.findOne({ username: data.username }, (err, user) => { // first check if username already exists in database
                if (err) {
                    return callback({ error: err });
                } else {
                    if (user) {
                        return callback({ error: { username: { message: 'username already exists' }}});
                    } else {
                        User.findOne({ email: data.email }, (err, user) => { // second check if email already exists in database
                            if (err) {
                                return callback({ error: err });
                            } else {
                                if (user) {
                                    return callback({ error: { email: { message: 'email already exists' }}});
                                } else { // if passes all checks, create user
                                    var user = new User(data);
                                    bcrypt.hash(data.password, 10)
                                    .then((hashed_password) => {
                                        user.password = hashed_password;
                                        user.save((err) => {
                                            if (err) {
                                                return callback({ error: err.errors });
                                            } else {
                                                return callback({ success: user._id });
                                            }
                                        });
                                    })
                                    .catch((err) => { //error
                                        return callback({ error: err });
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    loginUser: (data, callback) => { // allows user to login with username OR email
        User.findOne({ $or: [{ username: data.user }, { email: data.user }]}, (err, user) => {
            if (err) {
                return callback({ error: err });
            } else {
                if (user) { //found user with that username or email
                    bcrypt.compare(data.password, user.password)
                    .then((result) => {
                        if (result) {
                            return callback({ success: user._id });
                        } else {
                            return callback({ error: { cred: { message: 'Invalid Credentials' }}});
                        }
                    })
                    .catch((err) => { //error comparing passwords
                        return callback({ error: err });
                    });
                } else {
                    return callback({ error: { cred: { message: 'Invalid Credentials' }}}); //invalid username
                }
            }
        });
    },
    findUserById: (userId, callback) => {
        if (!userId) {
            return callback({ expired: { newConnection: true }});
        } else {
            User.findById(userId, (err, user) => {
                if (err) {
                    return callback({ error: err });
                } else {
                    if (user) {
                        return callback({ success: { user: user }});
                    } else {
                        return callback({ expired: { newConnection: true }});
                    }
                }
            });
        }
    },
    deleteUserById: (userId, callback) => {
        if (!userId) {
            return callback({ expired: { newConnection: true} });
        } else {
            User.findByIdAndDelete(userId, (err) => {
                if (err) {
                    return callback({ error: err });
                } else {
                    return callback({ success: true });
                }
            });
        }
    },
    updateProfileInfo: (data, userId, callback) => {
        if (!userId) {
            return callback({ expired: { newConnection: true} });
        } else {
            if (!isInputLongEnough(data.username)) {
                return callback({ error: { username: { message: 'username must be at least 2 characters' }}});
            } else if (!isInputLongEnough(data.email)) {
                return callback({ error: { password: { message: 'email must be at least 2 characters' }}});
            } else {
                User.findOne({ username: data.username }, (err, user) => { // first check if username already exists in database
                    if (err) {
                        return callback({ error: err });
                    } else {
                        if (user && user._id.toString() !== userId.toString()) { // if there is a user with that username && it's not the user updating
                            return callback({ error: { username: { message: 'username already exists' }}});
                        } else {
                            User.findOne({ email: data.email }, (err, user) => { // second check if email already exists in database
                                if (err) {
                                    return callback({ error: err });
                                } else {
                                    if (user && user._id.toString() != userId.toString()) {
                                        return callback({ error: { email: { message: 'email already exists' }}});
                                    } else { // if passes all checks, update user
                                        User.findByIdAndUpdate(userId, { $set: { username: data.username, email: data.email }}, { runValidators: true, new: true }, (err, user) => {
                                            if (err) {
                                                return callback({ error: err.errors });
                                            } else {
                                                return callback({ success: { user: user }});
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }
}

function isPasswordsMatch(password, password_confirmation) {
    return password === password_confirmation;
}

function isPasswordLongEnough(password) {
    return password.length >= 8;
}

function isInputLongEnough(input) {
    return input.length >= 2;
}
