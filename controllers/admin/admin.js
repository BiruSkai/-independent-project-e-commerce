const Queries = require('../../model/admin/queries');
const querySchema = {adminQuery:'', userDetails:''};
const userQuery = new Queries(querySchema);

const adminAuthenticate = async(req, res, next) => {
        const adminId = Number(req.session.user.id);
        console.log(adminId);
        console.log(typeof adminId);

        if(adminId === 3) {
                console.log('welcome Admin');
                return next();
        } return res.status(400).send("This is only for admin.");
};

//Queryparams all userdata or useraddress
const adminQuery = async (req, res) => {
        // query: user_data || user_address
        const {query} = req.params;
        querySchema.adminQuery = query;

        userQuery.usersDetailFromSchema()
        .then( data => {
                if (!data.error) {
                        return res.send(data.data);                
                } return res.status(400).send(data.message);
        });
};

//Query specific customer with their id for profile info
const customerData = async(req, res) => {
        const {customerId} = req.query;
        console.log(`query customerId: ${customerId}`);
        
        querySchema.userDetails = {customerId};
        console.log(querySchema);

        userQuery.customerDataFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.status(400).send(data.message);
        });
};

//Query specific customer with their id for address
const customerAddress = async(req, res) => {
        const {customerId} = req.query;
        // console.log(`customerId: ${customerId}`);
        
        querySchema.userDetails = {customerId};
        // console.log(querySchema);

        userQuery.customerAddressFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.status(400).send(data.message);
        });
};

//Delete customer with their id 
const deleteUserById = async(req,res) => {
        const {delete_id} = req.query;
        console.log(`delete_id: ${delete_id}`)

        querySchema.userDetails = {delete_id};
        console.log(querySchema);

        userQuery.deleteUserFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.message);
                } return res.status(400).send(data.message);
        });
};

module.exports = {
        adminAuthenticate, adminQuery, customerData, customerAddress, deleteUserById
}