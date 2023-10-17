const Queries = require('../../model/customer/queries');
const querySchema = {email:'', password:''};
const loginQuery = new Queries(querySchema);

const loginUser = async(req, res) => {
        const {email, password} = req.body;
        querySchema.email = email;
        querySchema.password = password;
        loginQuery.loginUser()
        .then( data => {
                try {
                        if (data.correct){
                                req.session.user = {id: data.id};
                                req.session.authenticated = true;
                                console.log(req.session);
        
                                return res.send('Login successfully.');
                        } else {
                                res.status(403).send(data.message);
                        };
                } catch(error) {
                        res.status(404).send(data.message);
                };
        });
};

const checkIfAuthenticated = (req, res, next) => {
        if (req.session.authenticated) {
                next();
        } else {
                res.send('Please authenticate yourself.')
        };
};

const logoutUser = (req, res) => {
        req.session.authenticated = false;
        res.send('User logged out.');
}

module.exports = {
        loginUser, checkIfAuthenticated, logoutUser
};