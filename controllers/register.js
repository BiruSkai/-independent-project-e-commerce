const Queries = require('../model/queries');
const userQuerySchema = {name:'userRegister', userDetails:''};
const userRegisterQuery = new Queries(userQuerySchema);
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
        const {title, fullname, password, gender, birth_date, email, telephone, user_type} = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);
        userQuerySchema.userDetails = {title, fullname, hashedPass, gender, birth_date, email, telephone, user_type};
        userRegisterQuery.registerUser()
        .then(data => {
                if(!data.error){
                        req.session.user = data.data;
                        req.session.authenticated = true;
                        console.log(req.session);
                        res.send('Register succeed');
                } else {
                        res.send(data.errorMessage);
                }; 
        });
};

module.exports = registerUser;