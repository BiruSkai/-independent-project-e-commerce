const Queries = require('../../model/customer/queries');
const querySchema = {sessionUserId:'', customerId:''};
const cartQuery = new Queries(querySchema);

const initializeCart = async(req, res, next) => {
        const {id} = req.session.user;
        console.log(`sessionUserId: ${id}`);

        querySchema.sessionUserId = id;
        cartQuery.initializeUserFromSchema()
        .then(data => {
                if(!data.error){
                        return res.send(data.message);
                        next();
                }else {
                        return res.status(400).send(data.message);
                };
        });
};

module.exports = {
        initializeCart
};