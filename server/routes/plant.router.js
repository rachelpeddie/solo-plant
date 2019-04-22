const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// getting all rooms from database
router.get('/rooms', (req, res) => {
    let sqlText = `SELECT * FROM "rooms";`;
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

// getting all sunlight requirements from database
router.get('/sun', (req, res) => {
    let sqlText = `SELECT * FROM "sunlight";`;
    pool.query(sqlText)
        .then(result => {
            let sunlight = result.rows;
            console.log(`sunlight requirements are`, sunlight);
            res.send(sunlight);
        }).catch(error => {
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