const UserSymbol = require("../../models/userSymbolModel");

const addSymbol = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.db);
        await userSymbol.add({
            userId: "1235",
            symbol: req.body.symbol
    })
    res.send("Success!");
    } catch (err) {
        next(err);
    }
}

module.exports = {addSymbol};