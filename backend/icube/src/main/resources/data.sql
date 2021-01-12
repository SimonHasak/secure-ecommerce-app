INSERT INTO color (color_hexadecimal) VALUES ('#32a852');
INSERT INTO color (color_hexadecimal) VALUES ('#a83240');

INSERT INTO image (image_name, url_address) VALUES ('advertisement-1', 'https://i.ibb.co/dLVDmqR/slider-img-3.png');

INSERT INTO image (image_name, url_address, image_slider_id) VALUES ('image-slider-1', 'https://i.ibb.co/bLwKdv7/slider-img-1.png', 1);
INSERT INTO image (image_name, url_address, image_slider_id) VALUES ('image-slider-2', 'https://i.ibb.co/8xJHSjQ/slider-img-2.png', 1);

INSERT INTO image (image_name, url_address, product_id) VALUES ('ciapka-1', 'https://i.ibb.co/S5c2dRp/hat-1.jpg', 1);
INSERT INTO image (image_name, url_address, product_id) VALUES ('ciapka-2', 'https://i.ibb.co/jhVwdSM/hat-2.jpg', 1);
INSERT INTO image (image_name, url_address, product_id) VALUES ('ciapka-3', 'https://i.ibb.co/fX7QdL7/hat-3.jpg', 1);
INSERT INTO image (image_name, url_address, product_id) VALUES ('ciapka-4', 'https://i.ibb.co/jhVwdSM/hat-2.jpg', 1);

INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-1', 'https://i.ibb.co/FWfT9zf/t-shirt-1.jpg', 2);
INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-2', 'https://i.ibb.co/whC7YBd/t-shirt-2.jpg', 2);
INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-3', 'https://i.ibb.co/FKsZRpV/t-shirt-3.jpg', 2);
INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-4', 'https://i.ibb.co/HVWjXj9/t-shirt-4.jpg', 2);
INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-5', 'https://i.ibb.co/y02FtDz/t-shirt-5.jpg', 2);
INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-6', 'https://i.ibb.co/gF9vVL7/t-shirt-6.jpg', 2);
INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-7', 'https://i.ibb.co/txSxySh/t-shirt-7.jpg', 2);
INSERT INTO image (image_name, url_address, product_id) VALUES ('tricko-8', 'https://i.ibb.co/pQHLV4T/t-shirt-8.jpg', 2);

INSERT INTO image (image_name, url_address, product_id) VALUES ('kacicka-1', 'https://i.ibb.co/Hzhtxww/duck-1.jpg', 3);
INSERT INTO image (image_name, url_address, product_id) VALUES ('kacicka-2', 'https://i.ibb.co/SXTj260/duck-2.jpg', 3);
INSERT INTO image (image_name, url_address, product_id) VALUES ('kacicka-3', 'https://i.ibb.co/T84jCTc/duck-3.jpg', 3);

INSERT INTO image (image_name, url_address, product_id) VALUES ('salka-1', 'https://i.ibb.co/C93fNfY/coffee-1.jpg', 4);
INSERT INTO image (image_name, url_address, product_id) VALUES ('salka-2', 'https://i.ibb.co/Lvnfh6y/coffee-2.jpg', 4);
INSERT INTO image (image_name, url_address, product_id) VALUES ('salka-3', 'https://i.ibb.co/ygT5f3s/coffee-3.jpg', 4);
INSERT INTO image (image_name, url_address, product_id) VALUES ('salka-4', 'https://i.ibb.co/PgjTKVm/coffee-4.jpg', 4);

INSERT INTO image (image_name, url_address, product_id) VALUES ('pohar-1', 'https://i.ibb.co/x3cVP1h/cup-1.jpg', 5);
INSERT INTO image (image_name, url_address, product_id) VALUES ('pohar-2', 'https://i.ibb.co/4jzk0bG/cup-2.jpg', 5);

INSERT INTO image (image_name, url_address, product_id) VALUES ('macko-1', 'https://i.ibb.co/stMxL1T/teddy-bear-1.jpg', 6);
INSERT INTO image (image_name, url_address, product_id) VALUES ('macko-2', 'https://i.ibb.co/wQp1WxZ/teddy-bear-2.jpg', 6);

INSERT INTO image (image_name, url_address, product_id) VALUES ('model-t-shirt', 'https://i.ibb.co/GtQxfGs/model-t-shirt.jpg', 7);

INSERT INTO image (image_name, url_address, product_id) VALUES ('car-1', 'https://i.ibb.co/WBbRrqs/car-1.jpg', 8);

INSERT INTO image (image_name, url_address, product_id) VALUES ('mimon-1', 'https://i.ibb.co/0y0ysNG/mimon-1.jpg', 9);

INSERT INTO image_slider (slider_interval) VALUES (3000);

INSERT INTO advertisement (image_id) VALUES (1);

INSERT INTO category (category_name) VALUES ('women'); -- id -> 1
INSERT INTO category (category_name) VALUES ('men'); -- id -> 2
INSERT INTO category (category_name) VALUES ('accessories'); -- id -> 3

INSERT INTO product_category (product_id, category_id) VALUES (1, 1);
INSERT INTO product_category (product_id, category_id) VALUES (1, 2);

INSERT INTO product_category (product_id, category_id) VALUES (2, 1);
INSERT INTO product_category (product_id, category_id) VALUES (2, 2);

INSERT INTO product_category (product_id, category_id) VALUES (3, 3);

INSERT INTO product_category (product_id, category_id) VALUES (4, 3);

INSERT INTO product_category (product_id, category_id) VALUES (5, 3);

INSERT INTO product_category (product_id, category_id) VALUES (6, 3);

INSERT INTO product_category (product_id, category_id) VALUES (7, 1);
INSERT INTO product_category (product_id, category_id) VALUES (7, 2);

INSERT INTO product_category (product_id, category_id) VALUES (8, 2);
INSERT INTO product_category (product_id, category_id) VALUES (8, 3);

INSERT INTO product_category (product_id, category_id) VALUES (9, 3);

INSERT INTO label (label_name) VALUES ('new'); -- id -> 1
INSERT INTO label (label_name) VALUES ('popular'); -- id -> 2
INSERT INTO label (label_name) VALUES ('free'); -- id -> 3

INSERT INTO product_label (product_id, label_id) VALUES (1, 1);
INSERT INTO product_label (product_id, label_id) VALUES (1, 2);

INSERT INTO product_label (product_id, label_id) VALUES (2, 1);

INSERT INTO product_label (product_id, label_id) VALUES (3, 1);
INSERT INTO product_label (product_id, label_id) VALUES (3, 2);
INSERT INTO product_label (product_id, label_id) VALUES (3, 3);

INSERT INTO product_label (product_id, label_id) VALUES (4, 1);

INSERT INTO product_label (product_id, label_id) VALUES (5, 1);

INSERT INTO product_label (product_id, label_id) VALUES (6, 1);
INSERT INTO product_label (product_id, label_id) VALUES (6, 2);

INSERT INTO product_label (product_id, label_id) VALUES (7, 1);
INSERT INTO product_label (product_id, label_id) VALUES (7, 2);

INSERT INTO product_label (product_id, label_id) VALUES (8, 1);

INSERT INTO product_label (product_id, label_id) VALUES (9, 1);

INSERT INTO measurement (measurement_name) VALUES ('XS';
INSERT INTO measurement (measurement_name) VALUES ('S');
INSERT INTO measurement (measurement_name) VALUES ('M');
INSERT INTO measurement (measurement_name) VALUES ('L');
INSERT INTO measurement (measurement_name) VALUES ('XL');
INSERT INTO measurement (measurement_name) VALUES ('XXL');

INSERT INTO measurement (measurement_name) VALUES ('Small');
INSERT INTO measurement (measurement_name) VALUES ('Medium');
INSERT INTO measurement (measurement_name) VALUES ('Large');

INSERT INTO product_measurement (product_id, measurement_id) VALUES (1, 7);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (1, 8);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (1, 9);

INSERT INTO product_measurement (product_id, measurement_id) VALUES (2, 1);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (2, 2);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (2, 3);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (2, 4);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (2, 5);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (2, 6);

INSERT INTO product_measurement (product_id, measurement_id) VALUES (7, 1);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (7, 2);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (7, 3);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (7, 4);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (7, 5);
INSERT INTO product_measurement (product_id, measurement_id) VALUES (7, 6);

INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name, visible_label) VALUES
('RU581', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/S5c2dRp/hat-1.jpg', 'Čiapka TUKE 2020', 12, 48, 'ciapka-tuke-2020', 'new');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name, visible_label) VALUES
('LE572', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/FWfT9zf/t-shirt-1.jpg', 'Tričko TUKE 2020', 10, 50, 'tricko-tuke-2020', 'new');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name) VALUES
('CO547', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/Hzhtxww/duck-1.jpg', 'Kačička TUKE 2020', 7, 74, 'kacicka-tuke-2020');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name) VALUES
('LU593', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/C93fNfY/coffee-1.jpg', 'Šálka TUKE 2020', 3, 42, 'salka-tuke-2020');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name) VALUES
('SU789', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/x3cVP1h/cup-1.jpg', 'Pohár TUKE 2020', 4, 42, 'pohar-tuke-2020');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name, visible_label) VALUES
('RQ304', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/stMxL1T/teddy-bear-1.jpg', 'Medveďový plyšák', 8, 42, 'medvedovy-plysak', 'new');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name, visible_label) VALUES
('PO704', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/GtQxfGs/model-t-shirt.jpg', 'Model tričko T', 8, 42, 'model-t-shirt', 'popular');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name) VALUES
('SI755', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/WBbRrqs/car-1.jpg', 'Auto model škodovka 1970', 10, 42, 'auto-model-skodovka-1970');
INSERT INTO product (code, description, main_image, product_name, price, quantity, url_name) VALUES
('AU745', 'Lorem ipsum dolor sit ame.', 'https://i.ibb.co/0y0ysNG/mimon-1.jpg', 'Mimoň žltý TUKE', 10, 42, 'mimon-zlty-tuke');

INSERT INTO user_entity (first_name, last_name, email, password, role) VALUES ('Admin', 'Admin', 'admin@admin.com', '$2a$10$0ZYlEAsCqyC41ltLlkr8jOnCCZuNpBKFj7AhNgFy5LrkZ5Zp9KxcS', 'ADMIN');
INSERT INTO user_entity (first_name, last_name, email, password, address, role) VALUES ('User', 'User', 'user@user.com', '$2a$10$GDtzD.FLeNfrfvhql4Uoqu7D8tF7p5Vgg2SWWtxze/suCO1XqN5d6', 'Kosice', 'USER');