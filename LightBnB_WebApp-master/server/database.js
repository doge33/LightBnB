const {Pool} = require('pg');
const { query_timeout } = require('pg/lib/defaults');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})
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
    //console.log('in getUserWithEmail res.rows NOT empty');
    return res.rows[0]

  } else {
    //console.log('in getUserWithEmail res.rows IS EMPTY');
    return null;
  }
  })
  .catch(err => err.message);
 
}
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
  
  .then(res => {
    
  if (res.rows.length !== 0) {
    //console.log('in getUserWithId res.rows not Empty');
    return res.rows[0];

  } else {
    //console.log('in getUserWithId res.rows IS NULL');
    return null;
  }
  })
  .catch(err => err.message);
  
}
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
    ON CONFLICT (users.name)
    DO NOTHING
    RETURNING *;
  `, [user.name, user.email, user.password])
  .then (res => res.rows[0])
  .catch(err => err.message);

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit) {
// => you can't put limit = 10 as a function parameter directly. Just won't pass on that value 10.
  return pool.query(`
    SELECT * FROM properties
    LIMIT $1;
  `, [limit = 10])
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
