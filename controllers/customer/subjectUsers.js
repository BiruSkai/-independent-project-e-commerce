const Queries = require('../../model/customer/queries');
const querySchema = { userDetails:''};
const userQuery = new Queries(querySchema);

const userData = async(req, res) => {
        const sessionId = req.session.user.id;
        // console.log(`sessionId: ${sessionId}`);

        querySchema.userDetails = {sessionId};
        // console.log(`querySchema: ${querySchema}`);

        userQuery.userDataFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.send(data.message);
        });
};

const updateUserData = async(req, res) => {
        const sessionId = req.session.user.id;
        const {title,telephone,user_type,password} = req.body;
        // console.log(user_type)

        if(user_type === 'buyer' || user_type === 'seller' || user_type === 'seller and buyer') {
                querySchema.userDetails = {sessionId,title,telephone,user_type,password}
                // console.log(querySchema.userDetails);

                userQuery.updateUserDataFromSchema()
                .then( data => {
                        if(!data.error) {
                                return res.send(data.message);
                        } return res.status(403).send({data:data.data, message:data.message});
                });                  
        } else {
                return res.send("User Type must be: 'buyer' || 'seller' || 'seller and buyer'");  
        };
};

const userAddress = async(req, res) => {
        const sessionId = req.session.user.id;
        // console.log(`sessionId: ${sessionId}`);

        querySchema.userDetails = {sessionId};
        // console.log(`querySchema: ${querySchema}`);

        userQuery.userAddressFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.send(data.message);
        });
};

const updateUserAddress = async(req, res) => {
        const sessionId = req.session.user.id;
        const {street_name,street_number} = req.body;
        const {postcode,city,province,country_code} = req.body;

        querySchema.userDetails = {
                sessionId, street_name, street_number,
                postcode, city, province, country_code};
        console.log(querySchema.userDetails);

        userQuery.updateUserAddressFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.message);
                } return res.status(403).send(data.message);
        });
};

module.exports = {userData, userAddress, updateUserAddress, updateUserData};