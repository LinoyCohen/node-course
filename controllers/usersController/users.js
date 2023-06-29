const UserSymbol = require("../../models/userSymbolModel");
const Symbol = require("../../models/symbol-value");

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

const dashboard = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.db);
        const userSymbols = await userSymbol.findByUserId({
            userId: 111
        });
        console.log(userSymbols);

        const promises = [];
        userSymbols.forEach((userSymbol) => promises.push(Symbol.findOne({symbol: userSymbol.symbol}).sort({createdAt : -1}).limit(1)))
        const Symbols = await Promise.all(promises);

        res.render('/dashboard', {
            userSymbols,
            Symbols,
        })
    } catch (err) {
        next(err);
    }
}


module.exports = {addSymbol, dashboard};