const fs = require('fs');

fs.readFile('./restaurants.json', (err, data) => {
	if(err){
		throw err;
	}
	else{
		let json = JSON.parse(data).map(e =>[e.id, e.name, e.description, e.address1, e.address2, e.city])
		console.log(json)
	}
})
