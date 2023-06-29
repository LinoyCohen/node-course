const mongoose = require('mongoose');

const SymbolValueSchema = new mongoose.Schema({
    symbol: String,
    timestamp: Date,
    value: Number,
});

const Symbol = mongoose.model('Symbol', SymbolValueSchema);

module.exports = Symbol;