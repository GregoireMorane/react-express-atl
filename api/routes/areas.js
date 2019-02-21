const express = require('express');
const router = express.Router();
const connection = require('../conf');

router.get('/', (req, res) => {
	connection.query(`SELECT * FROM areas`,(err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

router.get('/:x', (req, res) => {
	connection.query(`SELECT *, areas.name as area, restaurants.name as name FROM restaurants JOIN areas ON restaurants.id_area = areas.id WHERE areas.id = ?`, req.params.x, (err, results) => {
		if(err){
			res.status(500).send(err);
		} else {
			res.status(200).json(results);
		}
	})
})

module.exports = router;