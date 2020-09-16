SELECT properties.*, avg(property_reviews.rating) AS average_rating
FROM properties
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE city LIKE '%Vancouver%' AND rating >= 4
GROUP BY properties.id
HAVING avg(property_reviews.rating) >=4
ORDER BY  cost_per_night
LIMIT 10;

