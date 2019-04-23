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

// getting all plants and corresponding rooms/sun from database
    router.get('/', (req, res) => {
        let sqlText = ` SELECT "plants"."id" AS "plant_id", "plants"."user_id", "plants"."nickname", "plants"."plant_type", "plants"."image", "plants"."days_to_water",                                   "plants"."last_watered", "plants"."date_added", "plants"."status",
                        "rooms"."name" AS "room", "sunlight"."light" AS "sunlight" FROM "plants"
                        JOIN "rooms" ON "plants"."room_id" = "rooms"."id"
                        JOIN "sunlight" ON "plants"."sun_id" = "sunlight"."id"
                        WHERE "plants"."user_id"= $1;`;
        pool.query(sqlText, [req.user.id])
        .then( result => {
            let plantArray = result.rows;
            console.log(`successfully got all the plants from db`, plantArray);
            res.send(plantArray);
        }).catch( error => {
            console.log(`error getting all the plants from db`, error);
        })
    })
/**
 * POST route template
 */
router.post('/', (req, res) => {
    let plant = req.body;
    console.log(`plant is`, plant);
    console.log(`user is`, req.user);
    let sqlText = `INSERT INTO "plants" ("user_id", "nickname", "plant_type", "image", "days_to_water", "last_watered", "date_added", "room_id", "sun_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
    pool.query(sqlText, [req.user.id, plant.nickname, plant.type, plant.image, Number(plant.days), plant.last_watered, plant.date_added, plant.room_id, plant.sun_id])
    .then( response => {
        console.log(`Woot! Added new plant to database!`, plant);
        res.sendStatus(201);
    }).catch( error => {
        console.log(`error adding plant to database`, error);
        res.sendStatus(500);
    })
});

module.exports = router;