const mongoose = require('mongoose');

const PetSchema = mongoose.Schema({
    name: { type: String, minlength: [2, 'pet name must be at least 2 characters'] },
    type: { type: String, minlength: [2, 'pet type must be at least 2 characters'] },
    description: { type: String, minlength: [2, 'pet description must be at least 2 characters'] },
    location: { type: String, minlength: [2, 'location must be at least 2 characters'] },
    gender: { type: String },
    pet_pic_path: { type: String, required: true },
    skill_one: { type: String },
    skill_two: { type: String },
    skill_three: { type: String },
    adopted: { type: Boolean, required: true }
}, { timestamps: true });

const UserSchema = mongoose.Schema({
    username: { type: String, minlength: [2, 'username must be at least 2 characters'] },
    email: { type: String, minlength: [2, 'email must be at least 2 characters'] },
    password: { type: String, minlength: [8, 'password must be at least 8 characters'] },
    owned_pets: [PetSchema],
    adopted_pets: [PetSchema]
}, { timestamps: true });

mongoose.model('Pet', PetSchema);
mongoose.model('User', UserSchema);
