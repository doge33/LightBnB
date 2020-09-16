
INSERT INTO users (name, email, password)
VALUES
('Sally Hansen', 'sally@hansen.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Doug Jameson', 'doug@jameson.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bebe Zhang', 'bebe@zhang.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kelly Lee', 'kelly@lee.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kevin Bacon', 'kev@bacon.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jerry Dawson', 'jerry@dawson.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces,
 number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
(1, 'Secret Garden', 'enjoy this vacation house', 'https://icdn6.digitaltrends.com/image/digitaltrends/ormh01-255679-768x768.jpg', 
'https://shorttermrentalz.com/wp-content/uploads/2020/05/Airbnb-window-extension.jpg', 
200, 4, 3, 4, 'Canada', '102 Niagara Road', 'Tonronto', 'Ontario', '123445', true),
(1, 'Secret Villa', 'enjoy this vacation house', 'https://icdn6.digitaltrends.com/image/digitaltrends/ormh01-255679-768x768.jpg', 
'https://shorttermrentalz.com/wp-content/uploads/2020/05/Airbnb-window-extension.jpg', 
340, 6, 4, 5, 'Canada', '95 Surgeon Road',  'Tonronto', 'Ontario', '123409', true),
(2, 'jodaijsd mansion', 'enjoy this vacation house', 'https://i1.wp.com/500photos.com/wp-content/uploads/2019/01/c024d0_bdaa8b7113ac4ffcbdae06a0580469eb-prev.jpg', 
'https://i0.wp.com/500photos.com/wp-content/uploads/2019/01/c024d0_d51eebfe211140e7a9de534f2de57037-prev.jpg', 
278, 4, 3, 4, 'Canada', '99 Nassau Avenue', 'Markham', 'Ontario', '1dsd2', true),
(3, 'Snakes and Latte', 'enjoy this vacation house', 'https://icdn6.digitaltrends.com/image/digitaltrends/ormh01-255679-768x768.jpg', 
'https://shorttermrentalz.com/wp-content/uploads/2020/05/Airbnb-window-extension.jpg', 
115, 2, 1, 3, 'Canada', '123 Daniels Road', 'Burnaby',  'British Columbia', 'j23jsa', true),
(4, 'Horizon', 'enjoy this vacation house', 'https://icdn6.digitaltrends.com/image/digitaltrends/ormh01-255679-768x768.jpg', 
'https://i0.wp.com/500photos.com/wp-content/uploads/2019/01/c024d0_d51eebfe211140e7a9de534f2de57037-prev.jpg', 
200, 4, 2, 3, 'Canada', '65 Ellen Road', 'Calgary', 'Alberta', 'ahd322', true),
(4, 'Breadth of the Wild', 'enjoy this vacation house', 'https://i1.wp.com/500photos.com/wp-content/uploads/2019/01/c024d0_bdaa8b7113ac4ffcbdae06a0580469eb-prev.jpg', 
'https://shorttermrentalz.com/wp-content/uploads/2020/05/Airbnb-window-extension.jpg', 
500, 8, 4, 6, 'Canada', '130 Ellen Road', 'Calgary', 'Alberta', 'ahd343', true);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES 
('2018-03-06', '2018-03-07', 1, 2),
('2018-04-15', '2018-05-09', 3, 1),
('2019-07-27', '2019-08-06', 6, 5),
('2019-12-11', '2019-12-28', 4, 3),
('2020-01-05', '2020-01-19', 4, 1),
('2020-02-01', '2020-02-03', 2, 4),
('2020-04-15', '2020-05-01', 3, 6);


INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES
(2, 1, 1, 4, 'Thanks'),
(1, 3, 2, 4, 'Thanks'),
(5, 6, 3, 3, 'Thanks'),
(3, 4, 4, 5, 'Thanks'),
(1, 4, 5, 4, 'Thanks'),
(4, 2, 6, 3, 'Thanks'),
(6, 3, 7, 2, 'Sucks');
