const express = require('express');

const loginRouter = express.Router();
loginRouter.post('/', authenticateUser);

const logoutRouter = express.Router();
logoutRouter.get('/', logout)

const registerUserRouter = express.Router();
registerUserRouter.post('/', registerUser);

const usersRouter = express.Router();
usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', updateUserById);
usersRouter.delete('/:id', deleteUserById);

const storesRouter = express.Router();
storesRouter.get('/', getAllStores);
storesRouter.post('/register', registerStore);
storesRouter.get('/:id', getStoreById);
storesRouter.put('/:id', updateStoreById);
storesRouter.delete('/:id', deleteStoreById);

const storeProductsRouter = express.Router();
storeProductsRouter.get('/', getStoreAllProducts);
storeProductsRouter.post('/', addProductsStore);
storeProductsRouter.put('/', updateProductsStore);
storeProductsRouter.delete('/', deleteProductsStore);

const productCategoriesRouter = express.Router();
productCategoriesRouter.get('/', getAllProductCategories);

const categoryAllProductsRouter = express.Router();
categoryAllProductsRouter.get('/', getCategoryAllProducts);

const storesCategoryProductsRouter = express.Router();
storesCategoryProductsRouter.get('/', productDetail_inStoreCategory);

const userCartRouter = express.Router();
userCartRouter.get('/', userCartDetail);

const userHistoryRouter = express.Router();
userHistoryRouter.get('/', userHistoryDetail);

module.exports = {
        loginRouter, logoutRouter, registerUserRouter, usersRouter,
        storesRouter, storeProductsRouter, productCategoriesRouter,
        categoryAllProductsRouter, storesCategoryProductsRouter,
        userCartRouter, userHistoryRouter
};