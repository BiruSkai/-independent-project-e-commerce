const express = require('express');
//Admin
const {adminAuthenticate, adminQuery, customerData, customerAddress, deleteUserById} = require('../controllers/admin/admin');
//General
const {registerUser} = require('../controllers/customer/register');
const {loginUser, checkIfAuthenticated, logoutUser} = require('../controllers/customer/login_out');
const {userData, userAddress, updateUserAddress, updateUserData} = require('../controllers/customer/subjectUsers');
const {productCategory, productsInCategory, productInfo} = require('../controllers/customer/productCategory');
const {initializeCart, chosenProduct,deleteChosenProduct,cartPreview, checkoutCart} = require('../controllers/customer/cart');
const {cardValidation, deleteCard} = require('../controllers/customer/payment');

//Admin
const adminRouter = express.Router();
adminRouter.delete('/customer', checkIfAuthenticated, adminAuthenticate, deleteUserById);

// customerData & customerAddress with req.query {id}
adminRouter.get('/customerData', checkIfAuthenticated, adminAuthenticate, customerData);
adminRouter.get('/customerAddress', checkIfAuthenticated, adminAuthenticate, customerAddress);

// The most general api request placed last
// :query = userData || userAddress
adminRouter.get('/:query', checkIfAuthenticated, adminAuthenticate, adminQuery);

/*--------------------------------------------------- */
//General
const loginRouter = express.Router();
loginRouter.post('/', loginUser);

const logoutRouter = express.Router();
logoutRouter.get('/', logoutUser);

const registerUserRouter = express.Router();
registerUserRouter.post('/', registerUser);

/*----------------------------------------------------*/
//User
const userRouter = express.Router();
userRouter.get('/data', checkIfAuthenticated, userData);
userRouter.put('/data', checkIfAuthenticated, updateUserData);
userRouter.get('/address', checkIfAuthenticated, userAddress);
userRouter.put('/address', checkIfAuthenticated, updateUserAddress);

//User Payment
userRouter.post('/payment/card', checkIfAuthenticated, cardValidation);
userRouter.delete('/payment/card', checkIfAuthenticated, deleteCard);

const productCategoryRouter = express.Router();
productCategoryRouter.get('/categories', productCategory);
productCategoryRouter.get('/',  productsInCategory);
productCategoryRouter.get('/:productName',  productInfo);

const cartRouter = express.Router();
cartRouter.get('/initCart', checkIfAuthenticated, initializeCart);
cartRouter.post('/chooseProducts', checkIfAuthenticated, chosenProduct);
cartRouter.delete('/chooseProducts/delete', checkIfAuthenticated, deleteChosenProduct);
cartRouter.get('/cartPreview', checkIfAuthenticated, cartPreview);
cartRouter.post('/checkoutCart', checkIfAuthenticated, checkoutCart);

module.exports = {
        loginRouter, logoutRouter, registerUserRouter, userRouter, adminRouter,
        productCategoryRouter, cartRouter
};
