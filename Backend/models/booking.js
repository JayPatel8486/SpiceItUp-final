const { Schema, model, mongoose } = require("mongoose");

const bookingSchema = Schema([{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registrationDetails'
    },
    date: {
        type: Date,
        required: true,
    },
    time_slot: {
        type: Number,
        required: true,
    },
    table: {
        type: Number,
        required: true,
    },
    special_request: {
        type: String
    },
    timeStamp: {
        type: Number
    },
    status: {
        type: String,
        default: 'booked'
    },
    feedback: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: ''
    },
    createdBy: {
        type: String,
        default: 'user'
    },
    updatedBy: {
        type: String,
        default: 'user'
    }
}]);

// table orders collection
const Booking_model = new model('table_orders', bookingSchema);
module.exports = Booking_model;