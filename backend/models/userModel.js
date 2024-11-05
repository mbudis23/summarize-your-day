const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    _date: Date,
    _rate: Number,
    _summarize: String,
    _created_at: { type: Date, default: Date.now },
    _updated_at: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    _username: { type: String, required: true, unique: true },
    _email: { type: String, required: true, unique: true },
    _password: { type: String, required: true },
    _reports: [reportSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
