const Queries = require('../../model/customer/queries');
const querySchema = {category:'', productName:''};
const userQuery = new Queries(querySchema);

//Getting all categories of products
const productCategory = async(req, res) => { 
        userQuery.productCategoryFromSchema()
        .then(data => {
                if(!data.error){
                        res.send(data.data);
                        return
                } return res.status(400).send(data.message);
        });
};

// Getting all products in one category
const productsInCategory = async(req, res) => {
        const {category} = req.query;
        querySchema.category = category;

        userQuery.productsInCategoryFromSchema()
        .then(data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.status(400).send(data.message);
        });
};

const productInfo = async(req, res) => {
        const {productName} = req.params;
        console.log(`productName: ${productName}`)

        querySchema.productName = productName;

        userQuery.productInfoFromSchema()
        .then(data => {
                if(!data.error) {
                        return res.send(data.data);
                } return res.status(400).send(data.message);
        });
};

module.exports= {
        productCategory, productsInCategory, productInfo
}