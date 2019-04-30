const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => { 
    console.log(`req.query in sort`, req.query.type);
    let sqlText = ` SELECT "plants"."id" AS "plant_id", "plants"."user_id", "plants"."nickname",                     "plants"."plant_type", "plants"."image", "plants"."days_to_water",                               "plants"."last_watered", "plants"."date_added", "plants"."status",
                    "rooms"."name" AS "room", "sunlight"."light" AS "sunlight" FROM "plants"
                    JOIN "rooms" ON "plants"."room_id" = "rooms"."id"
                    JOIN "sunlight" ON "plants"."sun_id" = "sunlight"."id" WHERE "user_id" = $1
                    ORDER BY $2;`;
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