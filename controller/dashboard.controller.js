const express = require('express');
const DishDetails = require('../utilites/foodData');

const getAllFood = (req, res) => {
    try {
        console.log('inside comes');
        
        const allDish = DishDetails;
        // console.log(allDish);
        res.status(200).json({ 'data': allDish });
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
};

module.exports = {
    getAllFood
};

