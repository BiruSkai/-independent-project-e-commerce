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
}

module.exports = Queries;