const db = require('../db/index.js');
const express = require('express');
const app = express();

app.get('user/:id', async(res, req, next) => {
        const result = await db.query('SELECT * FROM user_data WHERE id=$1', [req.params.id]);
        res.send(result.rows[0]);
})