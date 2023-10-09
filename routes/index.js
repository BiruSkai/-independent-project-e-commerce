const express = require('express');
const {registerUser} = require('../controllers/customer/register');
const {adminAuthenticate, adminQuery, customerData, customerAddress} = require('../controllers/admin/admin');
const {loginUser, checkIfAuthenticated, logoutUser} = require('../controllers/customer/login_out');
const {userData, userAddress, updateUserAddress, updateUserData} = require('../controllers/customer/subjectUsers');
const {productCategory} = require('../controllers/customer/productCategory');

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

const adminRouter = express.Router();
adminRouter.get('/', adminAuthenticate);

// customerData & customerAddress with req.query
adminRouter.get('/customerData', checkIfAuthenticated, customerData);
adminRouter.get('/customerAddress', checkIfAuthenticated, customerAddress);

// The most general api request placed last
// :query = userData || userAddress
adminRouter.get('/:query', checkIfAuthenticated, adminQuery);

//Product Category
const productCategoryRouter = express.Router();
productCategoryRouter.get('/categories', checkIfAuthenticated, productCategory);


// const storeProductsRouter = express.Router();
// storeProductsRouter.get('/', getStoreAllProducts);
// storeProductsRouter.post('/', addProductsStore);
// storeProductsRouter.put('/', updateProductsStore);
// storeProductsRouter.delete('/', deleteProductsStore);

// const productCategoriesRouter = express.Router();
// productCategoriesRouter.get('/', getAllProductCategories);

// const categoryAllProductsRouter = express.Router();
// categoryAllProductsRouter.get('/', getCategoryAllProducts);

// const storesCategoryProductsRouter = express.Router();
// storesCategoryProductsRouter.get('/', productDetail_inStoreCategory);

// const storesRouter = express.Router();
// storesRouter.get('/', getAllStores);
// storesRouter.post('/register', registerStore);
// storesRouter.get('/:id', getStoreById);
// storesRouter.put('/:id', updateStoreById);
// storesRouter.delete('/:id', deleteStoreById);

// const userCartRouter = express.Router();
// userCartRouter.get('/', userCartDetail);

// const userHistoryRouter = express.Router();
// userHistoryRouter.get('/', userHistoryDetail);

// module.exports = {
//         loginRouter, logoutRouter, registerUserRouter, usersRouter,
//         storesRouter, storeProductsRouter, productCategoriesRouter,
//         categoryAllProductsRouter, storesCategoryProductsRouter,
//         userCartRouter, userHistoryRouter
// };

module.exports = {
        loginRouter, logoutRouter, registerUserRouter, userRouter, adminRouter,
        productCategoryRouter
}
