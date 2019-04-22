const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/rooms', (req, res) => {
    let sqlText = `SELECT * FROM "rooms"`;
    pool.query(sqlText)
    .then( result => {
        let rooms = result.rows;
        console.log(`rooms are`, rooms);
        
        res.send(rooms);
    }).catch( error => {
        console.log(`error getting rooms from database`, error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;