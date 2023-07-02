const Symbol  = require("../../models/symbol-value");
const UserSymbol = require("../../models/userSymbolModel");

exports.addSymbol = async (req, res, next) => {
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

exports.dashboard = async (req, res, next) => {
    try {
        const userSymbol = new UserSymbol(req.db);
        const userSymbols = await userSymbol.findByUserId({
            userId: 1
        });

        console.log(userSymbols);
        const promises = [];
        userSymbols.forEach((userSymbol) => promises.push(Symbol.findOne({symbol: userSymbol.symbol}).sort({createdAt : -1}).limit(1)))
        const symbols = await Promise.all(promises);
        res.render('users/dashboard', {
            userSymbols,
            symbols,
        })
    } catch (err) {
        next(err);
    }
}