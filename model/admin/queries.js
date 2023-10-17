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

        async deleteUserFromSchema() {
                const {id} = this.schema.userDetails;
                console.log(`schema-deleteUser_id: ${id}`);

                try {
                        const deleteUserData = await pool.query(`DELETE FROM user_data WHERE id=${id}`);
                        console.log('post deleteUserData');

                        return {error:false, message:'User has been deleted.'};
                        
                } catch(err) {
                        return {error:true, message:err};
                };
        };
};

module.exports = Queries;