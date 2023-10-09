const Queries = require('../../model/customer/queries');
const queryUser = new Queries();

const productCategory = async(req, res) => { 
        queryUser.productCategoryFromSchema()
        .then(data => {
                if(!data.error){
                        res.send(data.data);
                        return
                } return res.status(400).send(data.message);
        });
};

module.exports= {
        productCategory
}