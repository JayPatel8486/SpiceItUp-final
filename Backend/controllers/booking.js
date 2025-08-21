const table_orders = require('../models/booking');
const totalTables = require('../constants/const');

// Add new table booking details
const addBookingDetails = async (req, res) => {
    try {
        let add_booking = new table_orders({
            date: req.body.date,
            time_slot: req.body.time_slot,
            table: req.body.table,
            special_request: req.body.request,
            timeStamp: req.body.timeStamp,
            userId: req.body.userId
        })

        if (req.body.date && req.body.time_slot && req.body.table) {
            const result = await add_booking.save()
            console.log("new booking ", result);
            return res.status(201).send(result);
        }
        else {
            return res.status(400).send({ "error": "Invalid data!" })
        }

    } catch (e) {
        res.status(500).send({ "error": "Something went wrong!" });
        console.log("server error is", e);
    }

};

// Get timestamp and send table list
const checkAvailableBooking = async (req, res) => {

    try {
        const timeStamp = req.query;

        const reservations = await table_orders.find(timeStamp);
        console.log("table is reserved", reservations);

        const tables = reservations.map(r => r.table);
        console.log("table is coming", tables);

        const Availabletables = totalTables.filter(t => !tables.includes(t));

        if (Availabletables) {
            res.status(200).send(Availabletables);
            console.log("availabel talbes", Availabletables);

        } else {
            return res.status(204).send([]);
        }


    } catch (e) {
        res.status(500).send({ "error": "Something went wrong!" });
    }
}

// Get all bookings
const getBookingDetails = async (req, res) => {
    try {


        let all_bookings = await table_orders.find();

        if (all_bookings) {
            console.log("all booking", all_bookings);
            return res.status(200).send(all_bookings);

        } else {
            return res.status(404).send({ "error": "Booking details not found!" });
        }

    } catch (e) {
        res.status(500).send({ "error": "Something went wrong!" });
    }
};



module.exports = {
    addBookingDetails,
    checkAvailableBooking,
    getBookingDetails
}