-- Create the customer table in the "jamones" schema
CREATE TABLE jamones.customer
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Adjust the length according to your needs
    last_name VARCHAR(100) NOT NULL, -- Adjust the length according to your needs
    email VARCHAR(255) UNIQUE,  -- Email typically does not exceed 255 characters
    phone VARCHAR(50)  -- Adjust the length according to your needs
);

-- Create the package table in the "jamones" schema
CREATE TABLE jamones.package
(
    id SERIAL PRIMARY KEY,
    price DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    date_confirmed DATE,  -- Using DATE assuming only the date part is relevant
    date_received DATE  -- Using DATE assuming only the date part is relevant
);

-- Create the order table in the "jamones" schema
CREATE TABLE jamones."order"
(
    package_id INTEGER REFERENCES jamones.package,
    customer_id INTEGER REFERENCES jamones.customer,
    id SERIAL PRIMARY KEY,
    note VARCHAR(500)  -- Adjust the length according to your needs
);

-- Create the order_line table in the "jamones" schema
CREATE TABLE jamones.order_line
(
    id SERIAL PRIMARY KEY,
    weight DECIMAL(10,2),
    order_id INTEGER NOT NULL REFERENCES jamones."order"
);
