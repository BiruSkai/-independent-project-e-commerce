const express = require('express');
const {registerUser} = require('../controllers/customer/register');
const {adminAuthenticate, adminQuery, customerData, customerAddress, deleteUserById} = require('../controllers/admin/admin');
const {loginUser, checkIfAuthenticated, logoutUser} = require('../controllers/customer/login_out');
const {userData, userAddress, updateUserAddress, updateUserData} = require('../controllers/customer/subjectUsers');
const {productCategory, productsInCategory, productInfo} = require('../controllers/customer/productCategory');
const {initializeCart, chosenProduct,deleteChosenProduct,cartPreview, checkoutCart} = require('../controllers/customer/cart');
const {cardValidation, deleteCard} = require('../controllers/customer/payment');

const loginRouter = express.Router();
loginRouter.post('/', loginUser,adminAuthenticate);

const logoutRouter = express.Router();
logoutRouter.get('/', logoutUser);

const registerUserRouter = express.Router();
registerUserRouter.post('/', registerUser);

const userRouter = express.Router();
userRouter.get('/data/:id', checkIfAuthenticated, userData);
userRouter.put('/data/:id', checkIfAuthenticated, updateUserData);
userRouter.get('/address/:id', checkIfAuthenticated, userAddress);
userRouter.put('/address/:id', checkIfAuthenticated, updateUserAddress);
userRouter.post('/payment/card', checkIfAuthenticated, cardValidation);
userRouter.delete('/payment/card', checkIfAuthenticated, deleteCard);

const adminRouter = express.Router();
adminRouter.get('/', adminAuthenticate);
adminRouter.delete('/customer', checkIfAuthenticated, deleteUserById);

// customerData & customerAddress with req.query
adminRouter.get('/customerData', checkIfAuthenticated, customerData);
adminRouter.get('/customerAddress', checkIfAuthenticated, customerAddress);

// The most general api request placed last
// :query = userData || userAddress
adminRouter.get('/:query', checkIfAuthenticated, adminQuery);

//Product Category
const productCategoryRouter = express.Router();
productCategoryRouter.get('/categories', checkIfAuthenticated, productCategory);
productCategoryRouter.get('/',  productsInCategory);
productCategoryRouter.get('/:productName',  productInfo);

//Cart
const cartRouter = express.Router();
cartRouter.get('/initCart', checkIfAuthenticated, initializeCart);
cartRouter.get('/cartPreview', checkIfAuthenticated, cartPreview);
cartRouter.post('/chooseProducts', checkIfAuthenticated, chosenProduct);
cartRouter.delete('/chooseProducts', checkIfAuthenticated, deleteChosenProduct);
cartRouter.post('/checkoutCart', checkIfAuthenticated, checkoutCart);

module.exports = {
        loginRouter, logoutRouter, registerUserRouter, userRouter, adminRouter,
        productCategoryRouter, cartRouter
};
