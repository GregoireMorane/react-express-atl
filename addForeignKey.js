const areas = require('./areas-cleaned.json');
const restaurants = require('./restaurants-cleaned.json');
const { writeFile } = require('fs-promise');

const restaurantCleaned = [];
restaurants.map(restaurant => {
	areas.map(area => {
		if(restaurant.area === area.name){
			restaurantCleaned.push({
				name: restaurant.name,
				address: restaurant.address,
				city: restaurant.city,
				mainCategory: restaurant.mainCategory,
				editorial_rating: restaurant.editorial_rating,
				description: restaurant.description,
				to_website: restaurant.to_website,
				image_url: restaurant.image_url,
				latitude: restaurant.latitude,
				longitude: restaurant.longitude,
				id_area: area.id
			})
		}
	})
})
console.log(restaurantCleaned)

writeFile('restaurants-cleaned.json', JSON.stringify(restaurantCleaned, null, '\t'))
	.then(() => console.log('Wrote to file successfully'))