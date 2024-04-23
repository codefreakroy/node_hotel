const express = require('express')
const Person = require('../models/Person')
const router = express.Router()

//Post route add a person
router.post('/', async (req, res) => {

    /*
    const data = req.body // Assuming the request body contains the person data

    // Create a new person object using the Person model
    const newPerson = new Person(data)

    // Save the person object to the database
    newPerson.save((error, savedPerson) => {
        // If there is an error, send the error message
        if (error) {
            console.log("Error in saving person: ", error);
            res.status(500).json({ error: "Internal server error" })
        }
        // If the person is saved successfully, send the person object
        else {
            console.log("Data saved successfully");
            res.status(200).json(savedPerson)
        }
    })
    */

    try {
        const data = req.body // Assuming the request body contains the person data

        // Create a new person object using the Mongoose model
        const newPerson = new Person(data)

        // Save the person object to the database
        const response = await newPerson.save()
        console.log("Person saved in a database")

        // Send the person object as the response
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

// Get method to get all the persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log("Data Fatched");
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})

// Paramiterized route to get person by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType  // Get the workType from the request parameters

        if (workType == "chef" || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType })
            console.log("response fatched");
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "Invalid work type" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id // request the id from the URL parameter
        const updatedPersonData = req.body // request the updated person data from the request body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated person object
            runValidators: true, // run mongoose validators on the updated person data
        })

        if (!response) {
            return res.status(404).json({ error: "Person not found" })
        }

        console.log("person data updated");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id // request the id from the URL parameter

        // Find the person by ID and delete it
        const response = await Person.findByIdAndDelete(personId)
        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log("data deleted");
        res.status(200).json({ message: 'Person deleted successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router