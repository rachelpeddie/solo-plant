const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const moment = require('moment');

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

// adding new plant to database
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

// updating plant watered status to true/false
router.put('/:id', (req, res) => {
    let plant = req.body;
    let date = moment().format();
    let sqlText = `UPDATE "plants" SET "status" = $1, "last_watered" = $2 WHERE "plants"."id" = $3;`;
    console.log(`req.params are`, req.params);
    console.log(`req.body is`, req.body);
    console.log(`date is`, date);
    pool.query(sqlText, [!plant.status, plant.last_watered, req.params.id])
    .then( response => {
        console.log(`Woot!  Successfully updated plant status`);
        res.sendStatus(201);
    }).catch( error => {
        console.log(`error updating plant status in database`, error);
        res.sendStatus(500);
    })
})

// deleting plant from database
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(`plant id is`, id);
    let sqlText = `DELETE FROM "plants" WHERE "id" = $1;`;
    pool.query( sqlText, [id])
    .then( response => {
        console.log(`Woot! Successfully killed your plant!`);
        res.sendStatus(200);
    }).catch( error => {
        console.log(`error deleting your plant from the database`, error);
        res.sendStatus(500);
    })
})

module.exports = router;