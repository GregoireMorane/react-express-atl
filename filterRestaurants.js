const { get, uniqWith } = require('lodash');
const { writeFile } = require('fs-promise');
const restaurants = require('./restaurants.json');

const restaurantsCleaned = restaurants
  .map(restaurant => ({
    name: restaurant.name,
    address: restaurant.address1,
	  city: restaurant.city,
    mainCategory: get(restaurant, 'categorisation.primary.name'),
    editorial_rating: restaurant.editorial_rating,
    description: get(restaurant, 'description', ''),
    to_website: get(restaurant, 'to_website', ''),
    image_url: restaurant.image_url,
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
	  area: get(restaurant, 'area.name'),
  }))
  .filter(restaurant => (
    restaurant.name &&
    restaurant.address &&
	  restaurant.city &&
    restaurant.mainCategory &&
    restaurant.editorial_rating &&
    restaurant.description &&
    restaurant.image_url &&
    restaurant.latitude &&
    restaurant.longitude &&
	  restaurant.area
  ))
  .sort((a, b) => b.editorial_rating - a.editorial_rating)
// console.log(restaurantsCleaned)

Array.prototype.unique = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

const areasCleaned = restaurants
  .map((restaurant, index) => ({
    area: get(restaurant, 'area.name'),
  })).filter(restaurant => (
    restaurant.area
  ));

const getUnique = (arr, comp) => {
	const unique = arr
		.map(e => e[comp])
		.map((e, i, final) => final.indexOf(e) === i && i)
		.filter(e => arr[e]).map(e => arr[e]);
		return unique;
}

const newAreaCleaned = getUnique(areasCleaned, 'area');
const lastAreaCleaned = newAreaCleaned.map((e, i) => ({
	id: i + 1,
	name : e.area
}))

//console.log(getUnique(areasCleaned,'area'))

writeFile('restaurants-cleaned.json', JSON.stringify(restaurantsCleaned, null, '\t'))
	.then(() => console.log('Wrote to file successfully'))

writeFile('areas-cleaned.json', JSON.stringify(lastAreaCleaned, null, '\t'))
  .then(() => console.log('Wrote to file successfully'))
