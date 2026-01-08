const table_orders = require('../models/booking');
const totalTables = require('../constants/const');

// Add new table booking details
const addBookingDetails = async (req, res) => {
    try {
        const { date, time_slot, table, request, timeStamp, userId } = req.body;

        if (!date || !time_slot || !table) {
            return res.status(400).send({ error: "Invalid data!" });
        }

        let add_booking = new table_orders({
            date,
            time_slot,
            table,
            special_request: request,
            timeStamp,
            userId
        })

        const result = await add_booking.save();
        return res.status(201).send(result);

    } catch (err) {
        console.error("Add booking error: ", err);
        return res.status(500).send({ error: "Something went wrong!" });
    }
};

// Get timestamp and send table list
const checkAvailableBooking = async (req, res) => {
    try {
        const timeStamp = req.query;
        const reservations = await table_orders.find(timeStamp);
        const tables = reservations.map(r => r.table);
        const Availabletables = totalTables.totalTables.filter(t => !tables.includes(t));
        if (Availabletables.length === 0) {
            console.log("No tables available for the given time");
            return res.status(400).send("No tables available for the selected time");
        }
        return res.status(200).send(Availabletables);
    }
    catch (err) {
        console.error("Check available table error:", err);
        return res.status(500).send("Internal server error");
    }
}

// Get all bookings
const getBookingDetails = async (req, res) => {
    try {
        let all_bookings = await table_orders.find();
        if (!all_bookings) {
            console.log({ error: "Booking details not found!" });
            return res.status(404).send({ error: "Booking details not found!" });
        }
        console.log("all booking", all_bookings);
        return res.status(200).send(all_bookings);
    } catch (err) {
        console.error("Error while fetching booking details: ", err);
        return res.status(500).send("Internal server error");
    }
};



module.exports = {
    addBookingDetails,
    checkAvailableBooking,
    getBookingDetails
}