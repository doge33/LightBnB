const {Pool} = require('pg');
const { query_timeout } = require('pg/lib/defaults');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
//const properties = require('./json/properties.json');
//const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool.query(`
    SELECT * FROM users
    WHERE LOWER(users.email) = $1;
  `, [email.toLowerCase()])

    .then(res => {
      if (res.rows.length !== 0) {
        return res.rows[0];
      }
      return null;
    })
    .catch(err => err.message);
 
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  
  return pool.query(`
    SELECT * FROM users
    WHERE users.id = $1;
  `, [id])
  
    .then(res => res.rows[0].length !== 0 ? res.rows[0] : null)
    .catch(err => err.message);
  
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
    .then(res => {
      if (res.rows[0].name && res.rows[0].email && res.rows[0].password) {
        return res.rows[0];
      }
      return null;
    })
    .catch(err => err.message);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  
  return pool.query(`
    SELECT reservations.*, properties.*, avg(rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE reservations.guest_id = $1 AND reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `, [guest_id,limit])

    .then(res => res.rows)
    .catch(err => err.message);
  
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = []; //set up an array to hold any parameters that may be available for the query

  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) AS average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
    JOIN users ON users.id = properties.owner_id
  `;         //start the query with all info that comes before the WHERE clause

  //if user put in a city to search:
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`; //here, first $ is parameterized query; 2nd ${} gives the number from the length of queryParams array.
  }

  //if user put in a owner_id to search:
  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    queryString += ` AND owner_id = $${queryParams.length}`; //always adding the newest element in the array
  }

  //if user put in a minimum_price_per_night AND maximum_price_per_night, return bnb only within that price range
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night), Number(options.maximum_price_per_night));
    queryString += ` AND cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length}`;
  }

  //if user puts in a minimum_rating to search:
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += ` AND rating >= $${queryParams.length}`;
  }
  
  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id 
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;
  //console.log(queryString, queryParams)

  return pool.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => err.message);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  return pool.query(`
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, 
      city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,
    Number(property.cost_per_night), property.street, property.city, property.province, property.post_code, property.country,
    property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])

    .then(res => res.rows[0])
    .catch(err => err.message);
};
exports.addProperty = addProperty;
