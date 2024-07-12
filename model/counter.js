const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    seq:{
        type: Number,
        default: 0
    }
})

const Counter = new mongoose.model('Counter', counterSchema);
module.exports = Counter;