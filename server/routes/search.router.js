const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res) => {
    let search = req.query.search
    let url = process.env.API_URL
    let key = process.env.API_KEY
    console.log(`values are ${search}, ${url}, ${key}`);

    axios.get(`${url}?token=${key}&q=${search}`)
        .then(response => {
            res.send(response.data)
            console.log(`woot!  got stuff for plant on serverside`, response);
        }).catch(error => {
            console.log(`error getting plant stuff`, error);
            res.sendStatus(500);
        })
})

module.exports = router;