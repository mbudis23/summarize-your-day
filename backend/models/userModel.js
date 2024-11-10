const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    _date: Date,
    _rate: Number,
    _summarize: String,
    _created_at: { type: Date, default: Date.now },
    _updated_at: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    _username: { type: String, required: true },
    _email: { type: String, required: true, unique: true },
    _password: { type: String, required: true },
    _reports: [reportSchema]
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    const user = this;

    // Jika tidak ada laporan, lanjutkan proses penyimpanan
    if (!user._reports || user._reports.length === 0) {
        return next();
    }

    // Set untuk mengecek duplikasi tanggal
    const dateSet = new Set();

    for (const report of user._reports) {
        if (report._date) {
            const dateStr = report._date.toISOString();
            if (dateSet.has(dateStr)) {
                return next(new Error('Duplicate report date found'));
            }
            dateSet.add(dateStr);
        }
    }

    next();
});

module.exports = mongoose.model('User', userSchema);
