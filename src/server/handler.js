const cart = require('./cart');
const fs = require('fs');
const logger = require('./logger');

const handler = (req, res, action, file) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, text: err });
            return;
        }

        let { newCart, name } = cart[action](JSON.parse(data), req);
        fs.writeFile(file, newCart, (err) => {
            if (err) {
                console.log(err);
                res.send({ result: 0, text: err });
                return;
            }

            logger(name, action);
            res.send({ result: 1 });
        });
    })
};

module.exports = handler;