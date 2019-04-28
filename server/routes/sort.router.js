const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => { 
    console.log(`req.query in sort`, req.query.type);
    let sqlText = ` SELECT * FROM "plants" WHERE "user_id" = $1
                    ORDER BY $2`;
    pool.query(sqlText, [req.user.id, req.query.type])
    .then ( result => {
        console.log(`woot, got your plants in order!`);
        res.send(result.rows)
    }).catch ( error => {
        console.log(`error sorting plants on serverside`, error);
        res.sendStatus(500);
    })
});

module.exports = router;