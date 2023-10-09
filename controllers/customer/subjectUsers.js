const Queries = require('../../model/customer/queries');
const querySchema = { userDetails:''};
const userQuery = new Queries(querySchema);

const userData = async(req, res) => {
        const {id} = req.params;
        querySchema.id = id;
        userQuery.userDataFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.send(data.message);
        });
};

const updateUserData = async(req, res) => {
        const {id} = req.params;
        const {title,telephone,user_type,password} = req.body;
        querySchema.userDetails = {id,title,telephone,user_type,password}
       
        userQuery.updateUserDataFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.message);
                } return res.status(403).send({data:data.data, message:data.message});
        });
};

const userAddress = async(req, res) => {
        const {id} = req.params;
        querySchema.id = id;
        userQuery.userAddressFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.send(data.message);
        });
};

const updateUserAddress = async(req, res) => {
        const {id} = req.params;
        const {street_name,street_number} = req.body;
        const {postcode,city,province,country_code} = req.body;
        querySchema.userDetails = {
                id, street_name, street_number,
                postcode, city, province, country_code};

        userQuery.updateUserAddressFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.message);
                } return res.status(403).send(data.message);
        });
};

module.exports = {userData, userAddress, updateUserAddress, updateUserData};