const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//get route to get buyer waitlist information for seller receive offer page
router.get(`/buyer`, (req, res) => {
    console.log('user id', req.user.id);
    console.log('waitlist id', req.query.waitlistId);
    console.log('offer id is', req.query.offerId);
    pool.query(`SELECT * FROM "waitlist"
        WHERE "id" = $1
        AND "user_id" = $2;`, [req.query.waitlistId, req.user.id])
        .then(result => {
            if (result.rows.length) {
                console.log('inside buyer query');
                pool.query(`SELECT *, ROUND("quote_time" - EXTRACT(EPOCH FROM (NOW() - "waitlist"."join_waitlist_time"))/60)
                AS "latest_wait_time", "waitlist"."id" AS "waitlist_id" 
                FROM "user" 
                JOIN "waitlist" ON "waitlist"."user_id" = "user"."id"
                WHERE "waitlist"."restaurant_id" = $1
                AND "waitlist"."user_id" = $2
                AND "waitlist"."status_code" <> 2;`, [req.query.venueId, req.query.buyerId] )
                .then(
                    result => {
                        console.log('buyer', result.rows);
                        res.send(result.rows[0]);
                    })
            }
            
        })
        .catch(error => {
            console.log('error with getting buyer information for seller confirmation page');
            res.sendStatus(500);
        })
})

//get route to get seller waitlist information for seller receive offer page
router.get(`/seller/:waitlist_id`, (req, res) => {
    console.log('in seller route, waitlist id is', req.params.waitlist_id);
    pool.query(`SELECT *, ROUND("quote_time" - EXTRACT(EPOCH FROM (NOW() - "waitlist"."join_waitlist_time"))/60)
        AS "latest_wait_time" FROM "waitlist"
        JOIN "user" ON "user"."id" = "waitlist"."user_id"
        WHERE "waitlist"."user_id" = $1
        AND "waitlist"."id" = $2
        AND "waitlist"."status_code" = 3; `, [req.user.id, req.params.waitlist_id])
        .then(result => {
            console.log('seller', result.rows);
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('error with getting buyer information for seller confirmation page');
            res.sendStatus(500);
        })
})







module.exports = router;