const Queries = require('../../model/customer/queries');
const querySchema = {sessionUserId:'', selectProduct:''};
const cartQuery = new Queries(querySchema);

const initializeCart = async(req, res, next) => {
        const {id} = req.session.user;
        console.log(`sessionUserId: ${id}`);

        querySchema.sessionUserId = id;
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

        querySchema.selectProduct = {product_id, quantity};
        cartQuery.chosenProductFromSchema()
        .then(data => {
                if(!data.error){
                        res.send(data[0].message);
                        return data[1];
                } return res.status(400).send(data.message);
        });
};

module.exports = {
        initializeCart, chosenProduct
};