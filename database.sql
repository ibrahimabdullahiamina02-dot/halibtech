CREATE DATABASE halib_website;

USE halib_website;


CREATE TABLE enquiries (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL,

    phone VARCHAR(50),

    service VARCHAR(150) NOT NULL,

    subject VARCHAR(255),

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);