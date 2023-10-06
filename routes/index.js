const express = require('express');
const {registerUser} = require('../controllers/register');
const {loginUser, checkIfAuthenticated, logoutUser} = require('../controllers/login_out');
const {subjectUser, userAddress, updateUserAddress, updateUserData} = require('../controllers/subjectUsers');
// const {allUsers, getUserById, deleteUserById} = require('../controllers/objectUsers');

const loginRouter = express.Router();
loginRouter.post('/', loginUser);

const logoutRouter = express.Router();
logoutRouter.get('/', logoutUser);

const registerUserRouter = express.Router();
registerUserRouter.post('/', registerUser);

const userRouter = express.Router();
userRouter.get('/data/:id', subjectUser,checkIfAuthenticated);
userRouter.put('/data/:id', updateUserData,checkIfAuthenticated);
userRouter.get('/address/:id', userAddress,checkIfAuthenticated);
userRouter.put('/address/:id', updateUserAddress,checkIfAuthenticated);

// const storesRouter = express.Router();
// storesRouter.get('/', getAllStores);
// storesRouter.post('/register', registerStore);
// storesRouter.get('/:id', getStoreById);
// storesRouter.put('/:id', updateStoreById);
// storesRouter.delete('/:id', deleteStoreById);

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
        loginRouter, logoutRouter, registerUserRouter, userRouter
}
