const express = require('express');
const router = express.Router();
const connection = require('./conf');

router.get('/arrondissements/:x', (req, res) => {
	connection.query(`SELECT * FROM cleaned_restaurants WHERE address2 = ?`, req.params.x,(err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

router.get('/categories_primary/:x', (req, res) => {
	connection.query(`SELECT * FROM cleaned_restaurants WHERE categories_primary = ?`, req.params.x,(err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

router.get('/categories_secondary/:x', (req, res) => {
	connection.query(`SELECT * FROM cleaned_restaurants WHERE categories_secondary = ?`, req.params.x,(err, results) => {
		if(err){
			res.status(500).send("Error");
		} else {
			res.status(200).json(results);
		}
	})
})

module.exports = router;