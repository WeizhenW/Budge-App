const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get request for all participating venues in db
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "restaurant"`)
        .then( response => {
            res.send(response.rows);
        }) 
        .catch( error => {
            console.log('Error in SELECT query from restaurant:', error)
        })   
})

//get request to get the single restaurant + waitlist information that the user selected
router.get('/:restaurant_id', (req, res) => {
    console.log('hit get route for venue info');
    console.log(req.params.restaurant_id);
    pool.query(`SELECT *, "waitlist"."id" AS "waitlist_id", "waitlist"."status_code" AS "waitlist_status_code", "offer"."status_code" AS "offer_status_code" FROM "restaurant"
        LEFT JOIN "waitlist" ON "restaurant"."id" = "waitlist"."restaurant_id"
        LEFT JOIN "offer" ON "offer"."waitlist_id" = "waitlist"."id"
        WHERE "restaurant"."id" = $1
        AND "waitlist"."status_code" = 1;`, [req.params.restaurant_id])
        .then(result => {
            res.send(result.rows);
        })
        .catch( error => {
            console.log('error with getting one restaurant', error);
            res.sendStatus(500);
        })
})
module.exports = router;