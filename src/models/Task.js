const mongoose = require('mongoose');

const { Schema } = require('mongoose')

const Task = new Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Task', Task)
