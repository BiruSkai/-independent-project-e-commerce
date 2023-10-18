const Queries = require('../../model/customer/queries');
const userQuerySchema = {userDetails:''};
const userRegisterQuery = new Queries(userQuerySchema);
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
        const {title, fullname, password, gender, birth_date, email, telephone, user_type} = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        userQuerySchema.userDetails = {title, fullname, gender, birth_date, email, telephone, user_type, hashedPass};

        userRegisterQuery.registerUser()
        .then(data => {             
                if(!data.error){
                        req.session.user = data.data;
                        req.session.authenticated = true;
                        console.log(req.session);

                        return res.send(data.message);
                } else {
                      
                        return res.status(403).send(data.message);
                }; 
        });
};


module.exports = {registerUser};