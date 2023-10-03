const Queries = require('../model/queries');
const querySchema = {
        name:'user_data',
        id:'',title:'',telephone:'',street_name:'',street_number:'',postcode:'',city:'',provice:'',country_code:''
};
const userQuery = new Queries(querySchema);

const allUsers = async(req, res) => {
        userQuery.allUsersFromSchema()
        .then( data => {
                return res.send(data);
        });
};

const getUserById = async(req, res) => {
        const {id} = req.params;
        querySchema.id = id;

        userQuery.getUserByIdFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send(data.rows[0]);
                } else {
                        return res.status(403).send(data.message);
                };
        });
};

const updateUserById = async(req, res) => {
        const {id} = req.params;
        const {title,telephone,street_name,street_number,postcode,city,province,country_code} = req.body;
        querySchema.id = id;
        querySchema.title = title;
        querySchema.telephone = telephone;
        querySchema.street_name = street_name;
        querySchema.street_number = street_number;
        querySchema.postcode = postcode;
        querySchema.city = city;
        querySchema.province = province;
        querySchema.country_code = country_code;

        userQuery.getUserByIdFromSchema()
        .then( data => {
                if(!data.error) {
                        return res.send({data.rows[0], 'Update successful'});
                } return res.status(403).send(data.message);
        });
};

const deleteUserById = async(req,res) => {
        const {id} = req.body;
        querySchema.id = id;
        userQuery.deleteUserIdBySchema()
        .then( data => {
                return res.send(data.message);
        });
};

module.exports = {allUsers,getUserById,deleteUserById};