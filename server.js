const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT_SERVER;
const session = require('express-session');
const store = session.MemoryStore();
const morgan= require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {adminRouter, loginRouter, logoutRouter, registerUserRouter, userRouter} = require('./routes/index');
// const {storesRouter, storeProductsRouter, productCategoriesRouter} = require('./routes/index');
// const {categoryAllProductsRouter, storesCategoryProductsRouter} = require('./routes/index');
// const {userCartRouter, userHistoryRouter} = require('./routes/index');

app.options('*', cors());
app.enable('trust proxy', 1);
app.use(cookieParser());
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: {maxAge:1000*60*60, sameSite:'none'},
        store
}))
app.use(morgan('tiny'));
app.use(helmet());

app.use('/admin', adminRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register_user', registerUserRouter);
app.use('/user', userRouter);
// app.use('/stores', storesRouter);
// app.use('/stores/:id/store_products', storeProductsRouter);
// app.use('/category', productCategoriesRouter);
// app.use('/:category/products', categoryAllProductsRouter);
// app.use('/stores/category/products', storesCategoryProductsRouter);
// app.use('/users/:id/cart', userCartRouter);
// app.use('/users/:id/history', userHistoryRouter);

app.use((err, req, res, next) => {
        res.send(err.message);
    });

// Starting server 
app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
})