const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  subject: { type: String, required: true },
  notes: { type: String, required: true },
});

const TimerSchema = new mongoose.Schema({
  setTimer: {type: String, required: true},
  number: {type: Number, required: true},
  notificationId: {type: Number, required: true},
  timeType: {type: String, required: true},
})
const EventSchema = new mongoose.Schema({
  type: { type: String, required: true },
  appointment: {type: AppointmentSchema, required: true},
  timer: {type: TimerSchema, required: true},
});

const EventListSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    profileName: { type: String, required: true },
    events: [EventSchema],
  });

module.exports = mongoose.model("Event", EventListSchema, "events");
