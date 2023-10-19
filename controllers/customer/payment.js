const Queries = require('../../model/customer/queries');
let querySchema = {paymentDetail:''};
const paymentQuery = new Queries(querySchema);

const cardValidation = async(req, res) => {
        const userId = req.session.user.id;
        const {method, creditCardNumber} = req.body;
        // console.log(`payment.js`, userId, method, creditCardNumber);

        querySchema.paymentDetail = {userId, method, creditCardNumber};
        console.log(querySchema);

        paymentQuery.cardValidationFromSchema()
        .then(data => {
                if(!data.error){
                        res.send(data.message);
                } else{
                        res.status(400).send(data.message);
                };
        });
};

const deleteCard = async(req, res) => {
        const userId = req.session.user.id;
        // console.log(`userId: ${userId}`);

        querySchema.paymentDetail = {userId};
        // console.log(querySchema);

        paymentQuery.deleteCardFromSchema()
        .then(data => {
                if(!data.error){
                        res.send(data.message);
                } else{
                        res.status(400).send(data.message);
                };
        });
};

module.exports = {
        cardValidation, deleteCard
}