const Queries = require('../../model/admin/queries');
const querySchema = {adminQuery:'', userDetails:''};
const userQuery = new Queries(querySchema);

const adminAuthenticate = async(req,res,next) => {
        res.send("Welcome Admin.");
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
        const {id} = req.query;
        console.log(`query id: ${id}`);
        
        querySchema.id = id;
        userQuery.userDataFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.status(400).send(data.message);
        });
};

//Query specific customer with their id for address
const customerAddress = async(req, res) => {
        const {id} = req.query;
        console.log(`query id: ${id}`);
        
        querySchema.id = id;
        userQuery.userAddressFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.status(400).send(data.message);
        });
};

//Delete customer with their id 
const deleteUserById = async(req,res) => {
        const {id} = req.body;
        console.log(`id: ${id}`)

        querySchema.userDetails = {id};
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