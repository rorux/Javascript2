const add = (cart, req) => {
    cart.contents.push(req.body);
    return { newCart: JSON.stringify(cart, null, 4), name: req.body.title };
};

const remove = (cart, req) => {
    // cart["contents"].splice(cart["contents"].indexOf(req.body), 1);
    const find = cart.contents.find(el => el.id === +req.params.id);
    cart["contents"].splice(cart["contents"].indexOf(find), 1);
    return { newCart: JSON.stringify(cart, null, 4), name: find.title };
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    return { newCart: JSON.stringify(cart, null, 4), name: find.title };
};

module.exports = {
    add,
    remove,
    change
};