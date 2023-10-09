const Queries = require('../../model/admin/queries');
const querySchema = {adminQuery:'', userDetails:''};
const userQuery = new Queries(querySchema);

const adminAuthenticate = async(req, res, next) => {
        res.send('Welcome Admin');
        next();
};

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

const customerData = async(req, res) => {
        const {id} = req.query;
        console.log(`query id: ${id}`);
        
        querySchema.id = id;
        userQuery.userDataFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.send(data.message);
        });
};

const customerAddress = async(req, res) => {
        const {id} = req.query;
        console.log(`query id: ${id}`);
        
        querySchema.id = id;
        userQuery.userAddressFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.send(data.message);
        });
};

// const deleteUserById = async(req,res) => {
//         const {id} = req.body;
//         querySchema.id = id;
//         userQuery.deleteUserIdBySchema()
//         .then( data => {
//                 return res.send(data.message);
//         });
// };

// module.exports = {allUsers,getUserById,updateUserById,deleteUserById};

module.exports = {
        adminAuthenticate, adminQuery, customerData, customerAddress
}