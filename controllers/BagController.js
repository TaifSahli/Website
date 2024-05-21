const express = require('express');
const Bag = require('../models/BlogModel');
const createBag = async (req, res) => {
    console.log('Saving Bag Information');
    try {
        if (!req.session.userId) {
            req.flash('error', 'User not authenticated');
            return res.redirect('/blog');
        }

        console.log('Request Body:', req.body);

        const bagSizes = req.body.bagSize;
        const prices = req.body.price;
        const quantities = req.body.quantity;
        const items = req.body.item;

        // Ensure all arrays are of the same length
        if (Array.isArray(bagSizes) && Array.isArray(prices) && Array.isArray(quantities) && items && 
            bagSizes.length === prices.length && prices.length === quantities.length && quantities.length === Object.keys(items).length) {

            const bagDataArray = bagSizes.map((bagSize, index) => ({
                bagSize,
                price: prices[index] * quantities[index],
                quantity: quantities[index],
                item: items[index],
                userId: req.session.userId
            }));

            for (const bagData of bagDataArray) {
                console.log('Bag Data:', bagData);
                const newBag = new Bag(bagData);
                await newBag.save();
            }

            req.flash('message', 'Payment successfully');
        } else {
            req.flash('error', 'Mismatched input data. Please try again.');
        }

        return res.redirect('/blog');
    } catch (error) {
        console.log('Error saving bag:', error.message);
        req.flash('error', 'Error saving bag. Please try again.');
        return res.redirect('/blog');
    }
};



module.exports = { createBag };

const baggController = {
 
    updateBag: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedBag = await Bag.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedBag) {
                return res.status(404).json({ message: 'Bag not found' });
            }
            res.status(200).json(updatedBag);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getBag: async (req, res) => {
        try {
            const { id } = req.params;
            const bag = await Bag.findById(id);
            if (!bag) {
                return res.status(404).json({ message: 'Bag not found' });
            }
            res.status(200).json(bag);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteBag: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedBag = await Bag.findByIdAndDelete(id);
            if (!deletedBag) {
                return res.status(404).json({ message: 'Bag not found' });
            }
            res.status(200).json({ message: 'Bag deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = {createBag};
