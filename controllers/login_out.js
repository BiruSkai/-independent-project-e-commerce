const Queries = require('../model/queries');
const querySchema = {name: 'login_out', email:'', password:''};
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
                                res.send('Login successfully.')
                        } else {
                                res.status(403).send('Bad credentials.')
                        };
                } catch(error) {
                        res.status(403).send('Bad credentials.')
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