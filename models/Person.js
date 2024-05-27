const mongoose = require("mongoose")
const passport = require("passport")
const bcrypt = require("bcrypt")

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['owner', 'manager', 'chef', 'waiter'],
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

personSchema.pre('save', async function (next) {
    const person = this;

    // hash the password only if it is modified or new
    if (!person.isModified('password')) return next()
    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10)
        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)
        // override the plain password with the hashed one
        person.password = hashedPassword
        next();
    } catch (error) {
        next(error)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrypt to compare the password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

// Create Person Model
const Person = mongoose.model('Person', personSchema)

module.exports = Person
