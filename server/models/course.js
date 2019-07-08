let mongoose = require('mongoose');

let Course = mongoose.model('Course', {
    date: {
        type: String,
        required: true,
        minlength: 1
    },
    time: {
        type: String,
        required: true,
        minlength: 1
    },
    venue: {
        type: String,
        required: true,
        minlength: 1
    },
    details: {
        type: String,
        required: true,
        minlength: 1    
    },
    sort: {
        type: Number,
        required: true
    }
});

module.exports = {
    Course
};