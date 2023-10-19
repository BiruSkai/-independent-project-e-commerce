const pool = require('../pool');
const bcrypt = require('bcrypt');

class Queries {
        constructor (schema) {
                this.schema = schema;
        }
// For login and logout
        async loginUser() {
                const {email, password} = this.schema;
                const userData = await pool.query(`SELECT id,email,password, user_type FROM user_data WHERE email='${email}'`);          
                // console.log(userData.rows);
                if(!userData.rows[0]) return {message:'email not found'};

                const correctPass = await bcrypt.compare(password, userData.rows[0].password);
                if(correctPass) return {correct:true, id: userData.rows[0].id, userType: userData.rows[0].user_type};
                if(!correctPass) return {correct:false, message:'password not mactched'};
        };
// For user Registration
        async registerUser() {
                const {title, fullname, hashedPass, gender, birth_date, email, telephone, user_type} = this.schema.userDetails;
                const usedEmails = await pool.query(`SELECT email FROM user_data`);
                // console.log(usedEmails.rows);
               
                const duplicate = usedEmails.rows.some(el => el.email === email);
                // console.log(`duplicate:${duplicate}`);
                // console.log(`email:${email}`);
                
                if (!duplicate) {
                        try {
                                const user = await pool.query(`INSERT INTO user_data(title, fullname, gender, birth_date, 
                                        email, telephone, user_type, created_at, password) 
                                        VALUES('${title}','${fullname}','${gender}','${birth_date}','${email}',
                                        ${telephone},'${user_type}',NOW(),'${hashedPass}')`);
                                const userId = await pool.query(`SELECT id FROM user_data WHERE email = '${email}'`);
                                return {error:false, data:userId.rows[0], message:'Registration succeed.'};
                        } catch(err) {
                                return {error:true, message:'Problem occurred.'};
                        };
                } else {
                        return {error:true, message: 'Similar email found in db. Please try another email'}
                }
                
        };

//For subjectUsers.js
        async userDataFromSchema() {
                const {sessionId} = this.schema.userDetails;
                // console.log(`schema-sessionId: ${sessionId}`);

                try {
                        const userDetail = await pool.query(`SELECT * FROM user_data WHERE id=${sessionId}`);
                        // console.log(userDetail.rows[0]);

                        return {error:false, data: userDetail.rows[0]};
                } catch(err) {

                        return {error:true, message:err};
                };
        };

        async updateUserDataFromSchema() {
                const {sessionId,title,telephone,user_type,password} = this.schema.userDetails;
                // console.log(sessionId,title,telephone,user_type,password)
                
                try {
                        const salt = await bcrypt.genSalt();
                        const hashedPass = await bcrypt.hash(password, salt);

                        const updateUserData = await pool.query(
                                `UPDATE user_data 
                                SET title='${title}', telephone=${telephone}, user_type='${user_type}', 
                                password='${hashedPass}', updated_on= NOW() 
                                WHERE id=${sessionId}`
                        );

                        return {error:false, message: 'Userdata updated.'};
                } catch (err) {
                        return {error:true, message: "Userdata's update failed."};
                };  
        };

        async userAddressFromSchema() {
                const {sessionId} = this.schema.userDetails;
                // console.log(`schema-sessionId: ${sessionId}`);

                try {
                        const userAddressDetail = await pool.query(`SELECT * FROM user_address WHERE user_id=${sessionId}`);
                        // console.log(userAddressDetail.rows[0]);

                        return {error:false, data: userAddressDetail.rows[0]};
                } catch(err) {
                        
                        return {error:true, message:err};
                };
        };

        async updateUserAddressFromSchema() {
                const {sessionId,street_name,street_number,postcode,city,province,country_code} = this.schema.userDetails;
                console.log(sessionId);

                try {
                        
                        const updateUserAddressFromSchema = await pool.query(`
                                UPDATE user_address SET street_name='${street_name}',street_number='${street_number}',
                                postcode='${postcode}',city='${city}',province='${province}',
                                country_code='${country_code}', updated_on = NOW() WHERE user_id=${sessionId}`);

                        return {error:false, message: "Useraddress updated."};
                } catch (err) {
                        return {error:true, message: "Useraddress's update failed."};
                };  
        };

        

// For Product Category
        async productCategoryFromSchema() {
                const productCategory = await pool.query(`SELECT * FROM product_category`);
                console.log(productCategory
                        )
                try{
                        return {error:false, data:productCategory.rows};
                }catch(err){
                        return {error:true, message:'Error fetching product category'};
                };
        };

        async productsInCategoryFromSchema() {
                const {category} = this.schema;
                // console.log(`category: ${category}`);

                try{
                        const productsInCategory = await pool.query(`
                                SELECT * FROM product AS p
                                JOIN product_category AS pc
                                        ON pc.id = p.category_id
                                WHERE pc.category_name='${category}'`)

                        // console.log(productsInCategory)
                        const productsLength = productsInCategory.rows.length;
        
                        if(productsLength > 0){return {error:false, data:productsInCategory.rows}};
                        return {error:true, message:'Category or Product unavailable'} 
                }catch(err){
                        return {error:true, message:err};
                };
        };

        async productInfoFromSchema() {
                const {productName} = this.schema;
                console.log(`productName in method: ${productName}`);

                try{
                        const productInfo = await pool.query(`
                                SELECT * FROM product 
                                WHERE product_name='${productName}'`);
                        const productInfoLength = productInfo.rows.length;
        
                        if(productInfoLength > 0){return {error:false, data:productInfo.rows}};
                        return  {error:true, 
                                message:"Product info unavailable or failure on writting the product's alphabet"};
                }catch(err){
                        return {error:true, message:'Error catched'};
                };
        };

        async initializeUserFromSchema() {
                const initializeId = this.schema.cartDetail.id;
                // console.log(`initializeId in Schema: ${initializeId}`);

                try {              
                        // Insert InitializeId to initialize_cart
                        const initiate = await pool.query(
                                `INSERT INTO initialize_cart(session_user_id, created_on)
                                VALUES(${initializeId}, NOW())`);

                        return {error:false, message: 'Cart initialized. Enjoy your shopping.'};
                       
                } catch(err){
                        return {error:true, message:err.detail};
                };
        };

        async chosenProductFromSchema() {
                const {product_id, quantity} = this.schema.cartDetail.selectProduct;
                const cartId = this.schema.cartDetail.id;
                // console.log(`productId-quantity in Schema: ${product_id}-${quantity}, cartId in Schema: ${cartId}`);

                try{
                        if(!cartId){
                                return {error:true, message:'Init the cart first before shopping.'}
                        } 

                        const priceSelectProduct = await pool.query(
                                `SELECT price, product_name, unit_available FROM product WHERE id=${product_id}`);
                        // console.log(priceSelectProduct)

                        const priceSelectProductLength = priceSelectProduct.rows.length;
                        // console.log(`PriceSelectProductLength: ${priceSelectProductLength}`);

                        const unitInMerchant = priceSelectProduct.rows[0].unit_available;
                        // console.log(`UnitInMerchant: ${unitInMerchant}`)

                        if (priceSelectProductLength === 0 ) {
                                return {error:true, message: 'Product id not found'};
                        }
                        else if (unitInMerchant < quantity) {
                                return {error:true, message: `Merchant has only ${unitInMerchant} unit(s). Please modify your unit query.`}
                        }
                        else {
                                const price = priceSelectProduct.rows[0].price;
                                const product_name = priceSelectProduct.rows[0].product_name;
                                // console.log(price, product_name);

                                const totalCost = quantity * price;
                                // console.log(totalCost);

                                const fillProductCart = await pool.query(
                                        `INSERT INTO product_cart(product_id, cart_id, quantity, price, total_cost)
                                        VALUES(${product_id}, ${cartId}, ${quantity}, ${price}, ${totalCost})`);
                                // console.log('post fill product')

                                return [
                                        {error:false, message:`${quantity} ${product_name} added to cart and cost $${totalCost}`},
                                        this]
                                }
                }catch(err){
                        return {error:true, message:err};
                };
        };

        async deleteChosenProductFromSchema() {
                const product_id = this.schema.cartDetail.selectOrder;
                // console.log(`productcart_id in Schema: ${product_id}`);

                try {
                        const deleteProduct = await pool.query(`DELETE FROM product_cart WHERE product_id=${product_id}`);
                        // console.log(`post deleteProduct`);

                        return {error: false, message:`The product has been deleted from your cart.`}
                } catch(err) {
                        return {error: true, message:err};
                };
        };

        async cartPreviewFromSchema() {
                const {id} = this.schema.cartDetail;
                console.log(`sessionUserId in Schema: ${id}`);

                try {
                        const cartPreview = await pool.query(
                                `SELECT product_name, quantity, product_cart.price AS price_unit, total_cost
                                FROM product_cart 
                                JOIN product
                                        ON product.id = product_cart.product_id
                                WHERE cart_id =${id}`
                                );
                        
                        let data = cartPreview.rows;
                        // console.log(data);

                        let sum = Number(0);

                        let allCost = data.forEach(e => sum += Number(e.total_cost))
                        // console.log(`allCost: ${sum}`);

                        return {error: false, data:data, data2:sum};
                       
                } catch(err) {
                        return {error:true, message:err};
                };
        };

        async cardValidationFromSchema() {
                
                const {userId,method,creditCardNumber} = this.schema.paymentDetail;
                // console.log(`inside Schema:, ${userId}, ${method}, ${creditCardNumber}`);
                
                
                //Credit card's sample
                // const creditCardNumber = 6011111111111117;

                //A Formula to change creditCardNUmber to an array
                let myFunc = num => Number(num);
                const array = Array.from(String(creditCardNumber), myFunc);
                // console.log(array);

                //Find the max index in creditCardNumber array
                let i = array.length - 1;
                // console.log(typeof i);
                // console.log(`length of i -1: ${i}`);

                //A const for calculation which path the loop will take
                const lastIndex = i;
                // console.log(`Last index outside loop: ${lastIndex}`);

                //Initial number for total
                let total = 0;
                for (i; i >= 0; i--){
                        // console.log(`index: ${i}`);
                        // console.log(typeof i);
                        // console.log(`last index inside loop: ${lastIndex}`);
                        
                //Condition for path's calculation
                        if((lastIndex - i) % 2 !== 0) {
                                let double = array[i] * 2;
                                if(double > 9) {
                                        total += double - 9;
                                        // console.log('double path')
                                } else {
                                        total += double;
                                        // console.log('double path no substruction')
                                };
                        } else {
                                // console.log(`mundane path`);
                                total += array[i];
                        };
                };
                try{
                        // console.log(`total: ${total}`);
                        if(total % 10 === 0) {
                                // console.log(`inside if: ${userId}, ${method}, ${creditCardNumber}`)

                                const saveValidCard = await pool.query(
                                        `INSERT INTO payment(method, card_number, user_id, created_on) 
                                        VALUES('${method}', ${creditCardNumber}, ${userId}, NOW())`
                                );

                                return {error:false, message:'card has been saved'};
                        } else {
                                return {error:true, message:'card not authentic and not saved'};
                        };
                } catch(err) {
                        return {error:true, message:err};
                }
        };

        async deleteCardFromSchema() {
                const {userId} = this.schema.paymentDetail;
                // console.log(`userId in Schema: ${userId}`);

                try {
                        const deleteCard = await pool.query(`DELETE FROM payment WHERE user_id=${userId}`);
                        // console.log(`post deleteCard`);

                        return {error: false, message:`Card has been deleted.`}
                } catch(err) {
                        return {error: true, message:err};
                };
        };

        async checkoutCartFromSchema() {
                let {id, payment_method, pay_now} = this.schema.cartDetail;
                // console.log(`In Schema id-payment_method-pay_now: ${id}-${payment_method}-${pay_now}`);   

                const checkCardAvailability = async() => {
                        
                                const checkCardAvailability = await pool.query(
                                        `SELECT method, card_number FROM payment WHERE user_id=${id}`
                                );

                                // console.log(checkCardAvailability.rows[0]);

                                if(checkCardAvailability.rows[0] == undefined) {

                                        return {error:true, message:'Please add first your credit card.'};
                                } else {

                                        const method = checkCardAvailability.rows[0].method;
                                        const cardNumber = checkCardAvailability.rows[0].card_number;

                                        const regexCardNumber = /[0-9](?=[0-9]{4})/g;
                                        const displayCardNumber = cardNumber.replace(regexCardNumber, '*');
                                       
                                        return {error:false, method:method, display:displayCardNumber};
                                };
                };                
                        

                let checkpayment;
                switch(payment_method) {
                        case 'credit card':
                                checkpayment = await checkCardAvailability().then(data => {
                                        
                                        if(!data.error) {
                                                // console.log(data)
                                                return data;
                                        } else {
                                                return {error:data.error, message:data.message};
                                        }
                                });
                                break;
                        case 'bank transfer':
                                checkpayment = 'bank transfer';  
                                break;
                        case 'paypal':
                                checkpayment = 'paypal';     
                                break;                                
                        default:
                                return {error:true, message: 'Accepted payment method: credit card, bank transfer, paypal.'}
                };

                // console.log('checkpayment', checkpayment);
                
                if (checkpayment.error) {
                        return checkpayment;
                } else {
                        let payment = () => {
                                if(typeof(checkpayment) === 'object') {
                                        return {credit_card:checkpayment.method, number:checkpayment.display};
                                
                                } return checkpayment;
                        };

                        //Promise the the asked method
                        const checkPreviewCart = await this.cartPreviewFromSchema()
                                .then(data => {
                                        if(!data.error) {
                                                return {orderList: data.data, total_cost: data.data2};
                                        } return;
                                });
                        // console.log('after chaining method: ', checkPreviewCart); 
                
                        payment = JSON.stringify(payment());
                        // console.log(payment);

                        let textTradeHistory = JSON.stringify(checkPreviewCart); 
                        // console.log(textTradeHistory);

                        if(pay_now) {
                                try {   
                                        const insertTradeHistory = await pool.query(
                                                `INSERT INTO checkout_cart(payment_date, trade_history, user_id, currency, payment_method, status)
                                                VALUES(NOW(), '${textTradeHistory}', ${id},'usd', '${payment}', 'successful')`
                                                );         
                                        // console.log('post insertTradeHistory Schema')
                                        return{error:false}; 

                                } catch(err) {
                                        return{error:false, message:err};
                                }
                        } return {error:false, message: 'Set "pay_now:true" in JSON format to purchase your order.'};
                };
        };                 

        async UninitializedCartFromSchema () {
                const {id} = this.schema.cartDetail;
                console.log(`id: ${id}`);

                try{
                        const uninitializedCart = await pool.query(`DELETE FROM initialize_cart WHERE session_user_id=${id}`)
                        return {error:false, message:'Uninitializing cart successful.',
                                checkout_branch:'Thanks for the order and payment. Your order is in process.'};
                } catch(err) {
                        return {error:true, message:'Can not uninitializing cart.'}
                };
        };
};

module.exports = Queries;