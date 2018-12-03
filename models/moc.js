"use strict";

const mongoose = require('mongoose');

const mocSchema = new mongoose.Schema({
    moc_num: {
        type: String,
        required: false
    },
    moc_name: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: false
    },
    theme_id: {
        type: String,
        required: false
    },
    num_parts: {
        type: String,
        required: false
    },
    moc_img_url: {
        type: String,
        required: false
    },
    moc_url: {
        type: String,
        required: false
    },
    designer_name: {
        type: String,
        required: false
    },
    designer_url: {
        type: String,
        required: false
    },
    loggedInUserName: {
        type: String,
        required: false
    }

});

const Moc = mongoose.model('Moc', mocSchema);

module.exports = Moc;
