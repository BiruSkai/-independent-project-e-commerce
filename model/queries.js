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
        };

        async allUsersFromSchema() {
                const {name} = this.schema;
                const allUsersDetail = await pool.query(`SELECT * FROM '${name}'`);
                if(allUsersDetail.user_type === 'platform staff'){
                        return allUsersDetail;
                } return {errorMessage:'You are not allowed to enter this area(allUsersDetail).'}
        }

        async getUserByIdFromSchema() {
                const {name, id} = this.schema;
                const userIdDetail = await pool.query(`SELECT * FROM '${name}' WHERE id ='${id}'`);
                if(userIdDetail.user_type === 'platform staff'){
                        return {error:false, userIdDetail};
                } return {error:true, message:'You are not allowed to enter this area(userIdDetail).'}
        };

        async updateUserByIdFromSchema() {
                const {name,id,title,telephone,street_name,street_number,postcode,city,province,country_code} = this.schema;
                const updateUserTitle = await pool.query(`UPDATE TABLE '${name}' SET title='${title}' WHERE id='${id}`);
                const updateUserTelephone = await pool.query(`UPDATE TABLE '${name}' SET title='${telephone}' WHERE id='${id}`);
                const updateUserStreetName = await pool.query(`UPDATE TABLE '${name}' SET title='${street_name}' WHERE id='${id}`);
                const updateUserStreetNr = await pool.query(`UPDATE TABLE '${name}' SET title='${street_number}' WHERE id='${id}`);
                const updateUserPostcode = await pool.query(`UPDATE TABLE '${name}' SET title='${postcode}' WHERE id='${id}`);
                const updateUserCity = await pool.query(`UPDATE TABLE '${name}' SET title='${city}' WHERE id='${id}`);
                const updateUserProvince = await pool.query(`UPDATE TABLE '${name}' SET title='${province}' WHERE id='${id}`);
                const updateUserCountryCode = await pool.query(`UPDATE TABLE '${name}' SET title='${country_code}' WHERE id='${id}`);
                
                if(userIdDetail.user_type === 'platform staff' || req.session.id === id){
                        const updateDatas = updateUserTitle || updateUserTelephone || updateUserStreetName || updateUserStreetNr || 
                        updateUserPostcode || updateUserCity || updateUserProvince || updateUserCountryCode;
                        return {error:false, updateDatas};
                } return {error:true, message:'You are not allowed to enter this area(userIdDetail).'}
        };

        async deleteUserIdBySchema() {
                const {name, id} = this.schema;
                try {
                        const deleteUser = await pool.request(`DELETE FROM '${name}' WHERE id='${id}'`);
                        if(deleteUser) {
                                return {message: 'User has been deleted'}
                        } return {message: 'Delete order failed.'};
                } catch(err) {
                        return {message: 'Delete order failed.'};
                };
        };
};

module.exports = Queries;