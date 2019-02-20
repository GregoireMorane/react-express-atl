const fs = require('fs');
const resto = require('./restaurants.json');

const filteredJson = [];
resto.map(e => {
	if ((e.id && e.name && e.annotation && e.to_website && e.address1 && e.address2 && e.image_url && e.latitude && e.longitude && e.categorisation && e.editorial_rating) !== undefined){
		if((e.categorisation.primary && e.categorisation.secondary) !== undefined ){
			filteredJson.push(
				{ "name" : e.name, 
					"annotation" : e.annotation,
					"timeoutUrl" : e.to_website,
					"address1" : e.address1, 
					"address2" : e.address2, 
					"image_url" : e.image_url, 
					"latitude" : e.latitude, 
					"longitude" : e.longitude, 
					"editorial_rating" : e.editorial_rating, 
					"categories" : { "primary" : e.categorisation.primary.name, 
										"secondary" : e.categorisation.secondary.name}
									}
			)
		}
	}
})
//console.log(filteredJson)
fs.writeFileSync('cleaned-restaurants.json', JSON.stringify(filteredJson, null, 2));

// fs.readFile('./restaurants.json', (err, data) => {
// 	if(err){
// 		throw err;
// 	}
// 	else{
// 		const filteredJson = [];
// 		JSON.parse(data).map(e => {
// 			if ((e.id && e.name && e.annotation && e.address1 && e.address2 && e.image_url && e.latitude && e.longitude && e.categorisation && e.editorial_rating) !== undefined){
// 				if((e.categorisation.primary && e.categorisation.secondary) !== undefined ){
// 					filteredJson.push(
// 						{ "id" : e.id,
// 							"name" : e.name, 
// 							"annotation" : e.annotation, 
// 							"address1" : e.address1, 
// 							"address2" : e.address2, 
// 							"image_url" : e.image_url, 
// 							"latitude" : e.latitude, 
// 							"longitude" : e.longitude, 
// 							"editorial_rating" : e.editorial_rating, 
// 							"categories" : { "primary" : e.categorisation.primary.concept.name, 
// 												"secondary" : e.categorisation.secondary.concept.name}
// 											}
// 					)
// 				}
// 			}
// 		})
// 		console.log(filteredJson)
// 	}
// })
