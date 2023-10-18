const pool = require('../pool');
const customerQueries = require('../customer/queries');

class Queries extends customerQueries {

        //  Extra for admin
        async usersDetailFromSchema() {      
                const {adminQuery} = this.schema;
                // console.log(`1.adminQuery: ${adminQuery}`);         
                try {
                        const result = await pool.query(`SELECT * FROM ${adminQuery} ORDER BY id ASC`);
                        // console.log(`4:${result.rows}`);         
                        return {error:false, data:result.rows};
                } catch(err) {
                        return {error:true, message:`error: your query: ${adminQuery}`};
                }
        };

        async customerDataFromSchema() {
                const {customerId} = this.schema.userDetails;
                console.log(`schema-customerId: ${customerId}`);

                try {
                        const customerData = await pool.query(`SELECT * FROM user_data WHERE id=${customerId}`);
                        console.log(customerData.rows[0]);

                        return {error:false, data: customerData.rows[0]};
                } catch(err) {

                        return {error:true, message:err};
                };
        };

        async customerAddressFromSchema() {
                const {customerId} = this.schema.userDetails;
                console.log(`customerId: ${customerId}`);

                try {
                        const customerAddressDetail = await pool.query(`SELECT * FROM user_address WHERE user_id=${customerId}`);
                        // console.log(customerAddressDetail.rows[0]);

                        return {error:false, data: customerAddressDetail.rows[0]};
                } catch(err) {
                        
                        return {error:true, message:err};
                };
        };

        async deleteUserFromSchema() {
                const {delete_id} = this.schema.userDetails;
                console.log(`schema-delete_id: ${delete_id}`);

                try {
                        const deleteUserData = await pool.query(`DELETE FROM user_data WHERE id=${delete_id}`);
                        console.log('post deleteUserData');

                        return {error:false, message:'User has been deleted.'};
                        
                } catch(err) {
                        return {error:true, message:err};
                };
        };
};

module.exports = Queries;