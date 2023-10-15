const Queries = require('../../model/customer/queries');
const querySchema = {cartDetail:{selectProduct:''}};
// const querySchema = {sessionUserId:'', selectProduct:'', selectOrder:''};
const cartQuery = new Queries(querySchema);

const initializeCart = async(req, res, next) => {
        const {id} = req.session.user;
        // console.log(`sessionUserId: ${id}`);

        querySchema.cartDetail = {id};
        // console.log(querySchema);

        cartQuery.initializeUserFromSchema()
        .then(data => {
                if(!data.error){
                        initId = id;
                        console.log(`initId in initializeCart: ${initId}`);

                        res.send(data.message);
                        next();
                }else {
                        return res.status(400).send(data.message);
                };
        });
};

const chosenProduct = async(req,res) => {
        const {product_id, quantity} = req.body;
        // console.log(`productId: ${product_id}, quantity: ${quantity}`);

        querySchema.cartDetail.selectProduct = {product_id, quantity};
        // console.log(querySchema);

        cartQuery.chosenProductFromSchema()
        .then(data => {
                if(!data.error){
                        res.send(data[0].message);
                        return data[1];
                } return res.status(400).send(data.message);
        });
};

const deleteChosenProduct = async(req,res) => {
        const {product_id} = req.body;
        // console.log(product_id);

        querySchema.cartDetail.selectOrder = product_id;
        // console.log(querySchema);

        cartQuery.deleteChosenProductFromSchema()
        .then (data => {
                if(!data.error){
                       return res.send(data.message);
                } return res.status(400).send(data.err);
        });
};

const cartPreview = async(req,res) => {
        cartQuery.cartPreviewFromSchema()
        .then(data => {
                if(!data.error){
                        res.send([data[0].data,`Total cost of all items: $${data[0].data2}. Proceed to checkout cart for payment.`]);

                        console.log(data[1]);
                        return data[1];
                } else {
                        return res.send(data.message);
                };
        });
};

const checkoutCart = async(req,res) => {
        const {payment_method} = req.body;
        const {id} = req.session.user;
        console.log(`userId-payment_method: ${id}-${payment_method}`);

        querySchema.cartDetail = {id, payment_method};
        console.log(querySchema);

        cartQuery.checkoutCartFromSchema()
        .then(data => {
                if (!data.error){
                        res.send(data.message);
                        return;
                } else {
                        res.status(400).send(data.message);
                        return;
                };
        });
};

module.exports = {
        initializeCart, chosenProduct, deleteChosenProduct, cartPreview, checkoutCart
};