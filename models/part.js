"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const partSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    part_cat_id: {
        type: String,
        required: false
    },
    part_img_url: {
        type: String,
        required: false
    },
    part_num: {
        type: String,
        required: false
    },
    part_url: {
        type: String,
        required: false
    },
    year_from: {
        type: String,
        required: false
    },
    year_to: {
        type: String,
        required: false
    }
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;
