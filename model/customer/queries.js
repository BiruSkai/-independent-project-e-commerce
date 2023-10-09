const pool = require('../pool');
const bcrypt = require('bcrypt');

class Queries {
        constructor (schema) {
                this.schema = schema;
        }

        async loginUser() {
                const {email, password} = this.schema;
                const userData = await pool.query(`SELECT id,email,password, user_type FROM user_data WHERE email='${email}'`);          
                // console.log(userData.rows);
                if(!userData.rows[0]) return {message:'email not found'};

                const correctPass = await bcrypt.compare(password, userData.rows[0].password);
                if(correctPass) return {correct:true, id: userData.rows[0].id, userType: userData.rows[0].user_type};
                if(!correctPass) return {correct:false, message:'password not mactched'};
        };

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
                const {id} = this.schema;
                try {
                        const userDetail = await pool.query(`SELECT * FROM user_data WHERE id=${id}`);
                        return {error:false, data: userDetail.rows[0]};
                } catch(err) {

                        return {error:true, message:'Error occured.'};
                };
        };

        async userAddressFromSchema() {
                const {id} = this.schema;
                try {
                        const userAddressDetail = await pool.query(`SELECT * FROM user_address WHERE user_id=${id}`);
                        return {error:false, data: userAddressDetail.rows[0]};
                } catch(err) {
                        
                        return {error:true, message:'Error occured.'};
                };
        };

        async updateUserAddressFromSchema() {
                const {id,street_name,street_number,postcode,city,province,country_code} = this.schema.userDetails;
                try {
                        
                        const updateUserAddressFromSchema = await pool.query(`
                                UPDATE user_address SET street_name='${street_name}',street_number='${street_number}',
                                postcode='${postcode}',city='${city}',province='${province}',
                                country_code='${country_code}', updated_on = NOW() WHERE user_id=${id}`);

                        return {error:false, message: "Useraddress updated."};
                } catch (err) {
                        return {error:true, message: "Useraddress's update failed."};
                };  
        };

        async updateUserDataFromSchema() {
                const {id,title,telephone,user_type,password} = this.schema.userDetails;
                
                try {
                        const salt = await bcrypt.genSalt();
                        const hashedPass = await bcrypt.hash(password, salt);
                        
                        const updateUserDataFromSchema = await pool.query(`
                                UPDATE user_data SET title='${title}',telephone=${telephone}, 
                                user_type='${user_type}',password='${hashedPass}',updated_on=NOW() WHERE id=${id}`);
                        
                        return {error:false, message: 'Userdata updated.'};
                } catch (err) {
                        return {error:true, message: "Userdata's update failed."};
                };  
        };



// //         async getUserByIdFromSchema() {
// //                 const {name, id} = this.schema;
// //                 const userIdDetail = await pool.query(`SELECT * FROM '${name}' WHERE id ='${id}'`);
// //                 if(userIdDetail.user_type === 'platform staff'){
// //                         return {error:false, userIdDetail};
// //                 } return {error:true, message:'You are not allowed to enter this area(userIdDetail).'}
// //         };

// //         async updateUserByIdFromSchema() {
// //                 const {name,id,title,telephone,street_name,street_number,postcode,city,province,country_code} = this.schema;
// //                 const updateUserTitle = await pool.query(`UPDATE TABLE '${name}' SET title='${title}' WHERE id='${id}`);
// //                 const updateUserTelephone = await pool.query(`UPDATE TABLE '${name}' SET title='${telephone}' WHERE id='${id}`);
// //                 const updateUserStreetName = await pool.query(`UPDATE TABLE '${name}' SET title='${street_name}' WHERE id='${id}`);
// //                 const updateUserStreetNr = await pool.query(`UPDATE TABLE '${name}' SET title='${street_number}' WHERE id='${id}`);
// //                 const updateUserPostcode = await pool.query(`UPDATE TABLE '${name}' SET title='${postcode}' WHERE id='${id}`);
// //                 const updateUserCity = await pool.query(`UPDATE TABLE '${name}' SET title='${city}' WHERE id='${id}`);
// //                 const updateUserProvince = await pool.query(`UPDATE TABLE '${name}' SET title='${province}' WHERE id='${id}`);
// //                 const updateUserCountryCode = await pool.query(`UPDATE TABLE '${name}' SET title='${country_code}' WHERE id='${id}`);
                
// //                 if(userIdDetail.user_type === 'platform staff' || req.session.id === id){
// //                         const updateDatas = updateUserTitle || updateUserTelephone || updateUserStreetName || updateUserStreetNr || 
// //                         updateUserPostcode || updateUserCity || updateUserProvince || updateUserCountryCode;
// //                         return {error:false, updateDatas};
// //                 } return {error:true, message:'You are not allowed to enter this area(userIdDetail).'}
// //         };

// //         async deleteUserIdBySchema() {
// //                 const {name, id} = this.schema;
// //                 try {
// //                         const deleteUser = await pool.request(`DELETE FROM '${name}' WHERE id='${id}'`);
// //                         if(deleteUser) {
// //                                 return {message: 'User has been deleted'}
// //                         } return {message: 'Delete order failed.'};
// //                 } catch(err) {
// //                         return {message: 'Delete order failed.'};
// //                 };
// //         };
};

module.exports = Queries;