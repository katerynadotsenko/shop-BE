create extension if not exists "uuid-ossp";
create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer
);

create table stocks (
	product_id uuid,
	foreign key ("product_id") references "products" ("id"),
	count integer
);


with product as (
	insert into products (title, description, price) values
	('Product 1 DB', 'Short Product Description 1', 20.5)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 23);

with product as (
	insert into products (title, description, price) values
	('Product 2 DB', 'Short Product Description 2', 20)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 123);

with product as (
	insert into products (title, description, price) values
	('Product 3 DB', 'Short Product Description 3', 26.8)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 67);

with product as (
	insert into products (title, description, price) values
	('Product 4 DB', 'Short Product Description 4', 567)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 3);

with product as (
	insert into products (title, description, price) values
	('Product 5 DB', 'Short Product Description 5', 56.9)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 78);

with product as (
	insert into products (title, description, price) values
	('Product 6 DB', 'Short Product Description 6', 765)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 1);

with product as (
	insert into products (title, description, price) values
	('Product 7 DB', 'Short Product Description 7', 87.5)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 10);

with product as (
	insert into products (title, description, price) values
	('Product 8 DB', 'Short Product Description 8', 50.5)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 90);

with product as (
	insert into products (title, description, price) values
	('Product 9 DB', 'Short Product Description 9', 45)
	returning id
)
insert into stocks (product_id, count) values
	((select id from product), 7);