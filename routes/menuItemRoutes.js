const express = require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItem')

// Post method to add a menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming the request body contains the menu item data

        // Create a new menu item object using the Mongoose model
        const newMenu = new MenuItem(data)

        // Save the menu item object to the database
        const response = await newMenu.save()
        console.log("Menu saved in a database");

        // Send the menu item object as the response
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" })
    }
})

// Get method to get all the menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log("Menu data fatched");
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server error" })
    }
})

// paramiterized get method to get a menu item by taste
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste // Get the taste from the request parameters

        if (taste == "spicy" || taste == "sweet" || taste == "sour" || taste == "salty") {
            const response = await MenuItem.find({ taste: taste })
            console.log("response fatched");
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "Invalid taste !" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id // request the id from the URL parameter

        const updatedMenuItemData = req.body // Assuming the request body contains the updated menu item data

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true, // return the updated menu item object
            runValidators: true, // run mongoose validators on the updated menu item data
        })

        if (!response) {
            return res.status(404).json({ error: "Menu item not found" })
        }

        console.log("menuItem data updated");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id // request the id from the URL parameter

        // Find the menu item by ID and delete it
        const response = await MenuItem.findByIdAndDelete(menuItemId)
        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router