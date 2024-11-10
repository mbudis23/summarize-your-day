const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    rate: Number,
    summarize: String,
    createdAt: { type: Date, default: Date.now },  // Field names updated for consistency
    updatedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reports: [reportSchema]
}, {
    timestamps: true  // This will automatically add `createdAt` and `updatedAt` fields to the userSchema
});

// Ensure no duplicate report dates per user
userSchema.pre('save', function (next) {
    const user = this;

    if (!user.reports || user.reports.length === 0) {
        return next();
    }

    const dateSet = new Set();

    // Check for duplicate dates
    user.reports.forEach(report => {
        const dateStr = report.date.toISOString().substring(0, 10);  // Consider only the date part (YYYY-MM-DD)
        if (dateSet.has(dateStr)) {
            return next(new Error('Duplicate report date found'));
        }
        dateSet.add(dateStr);
    });

    next();
});

module.exports = mongoose.model('User', userSchema);
