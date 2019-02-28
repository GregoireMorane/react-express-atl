const express = require('express');
const router = express.Router();
const connection = require('../conf');

router.get('/', (req, res) => {
	connection.query(`SELECT * FROM restaurants`,(err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

router.get('/single/:id', (req, res) => {
	connection.query(`SELECT * FROM restaurants WHERE id = ?`,req.params.id,(err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

router.get('/category/:x', (req, res) => {
	connection.query(`SELECT * FROM restaurants WHERE mainCategory = ?`, req.params.x, (err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

router.get('/rating/:x', (req, res) => {
	connection.query(`SELECT * FROM restaurants WHERE editorial_rating = ?`, req.params.x,(err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

module.exports = router;
