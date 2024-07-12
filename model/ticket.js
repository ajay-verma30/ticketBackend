const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    tnumber:{
        type:String,
        required: true
    },
    catalog:{
        type: String,
        required: true
    },
    manager:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    updatedAt:{
        type: Date
    },
    status:{
        type: String,
        default: 'Open'
    }
})

const TicketDetail = new mongoose.model('TicketDetail', ticketSchema);
module.exports = TicketDetail;