const express = require('express');
const axios = require('axios');
const router = express.Router();
const accountSid = 'AC1ed15c2b932127a8396c2bb567595884';
const authToken = '19bad305d655d5a0cbc8478ed7ad925a';
const client = require('twilio')(accountSid, authToken);
const cron = require('node-cron');
const pool = require('../modules/pool');

router.post('/', (req, res) => {
    console.log(`req.body is`, req.body);
    res.sendStatus(201);
});

function checkWater (){
    console.log(`in checkWater`);
    
    axios.get('/')
    let sqlText = ` SELECT "user"."id", "user"."username", "user"."phone", string_agg("plants"."nickname", ', ') AS "your_plants" FROM "user"
                    JOIN "plants" ON "plants"."user_id" = "user"."id"
                    WHERE "plants"."status" = $1
                    GROUP BY "user"."id";`;
        pool.query(sqlText, [false])
            .then(response => {
                let plantArray = response.rows;
                for (user of plantArray) {
                    console.log(`user is`, user);
                    
                    if (plantArray.length === 0) {
                        console.log(`no plants to water`);
                    }
                    else {

                        client.messages
                            .create({
                                body: `Hey! ${user.username}, you need to water ${user.your_plants}`,
                                from: '+12679037114',
                                to: `${user.phone}`
                            })
                            .then(message => console.log(message.sid));
                    }
                }
            }).catch(error => {
                console.log(`error getting response`, error);
            })
    }


cron.schedule('* * * * *', () => {
    console.log(`running node cron every minute`);
    // checkWater();
},
    {
        scheduled: true,
    });
module.exports = router;