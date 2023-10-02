const pool = require('./pool');
const bcrypt = require('bcrypt');

class Queries {
        constructor (schema) {
                this.schema = schema;
        }

        async loginUser() {
                const {email, password} = this.schema;
                const user = await pool.query(`SELECT * FROM user_data WHERE email='${email}'`);
                const correctPass = await bcrypt.compare(password, user.rows[0].password);
                if(!user.rows[0]) return null;
                if(correctPass) return {correct:true, id: user.rows[0].id};
                else return false;
        }

        async registerUser() {
                const {title, fullname, hashedPass, gender, birth_date, email, telephone, user_type} = this.schema.userDetails;
                try {
                        const user = await pool.query(`
                        INSERT INTO user_data(title, fullname, password, gender, birth_date, email, 
                                telephone, user_type, created_at) VALUES('${title}','${fullname}','${hashedPass}','${gender}',
                                '${birth_date}','${email}','${telephone}','${user_type}',now())
                                `);
                        const userId = await pool.query(`SELECT id FROM user_data WHERE email = '${email}'`);
                        return {error: false, data: userId.rows[0]};
                } catch(err) {
                        return {error: true, errorMessage: 'A Problem occurred.Please try a different username or/and password.'}
                };
        }
}