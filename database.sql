
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "plants" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(80) NOT NULL,
	"image" varchar(600),
	"days_to_water" int NOT NULL,
	"date_added" DATE NOT NULL,
	"status" boolean DEFAULT true,
	"room_id" INT REFERENCES "rooms",
	"sun_id" INT REFERENCES "sunlight"
);

CREATE TABLE "rooms" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(80)
);

CREATE TABLE "sunlight" (
	"id" SERIAL PRIMARY KEY,
	"light" text
);

INSERT INTO "rooms" ("name")
VALUES ('Kitchen'), ('Dining Room'), ('Living Room'), ('Family Room'), ('Bathroom'), ('Bedroom'), ('Porch');

INSERT INTO "sunlight" ("light") VALUES ('Low Light'), ('Moderate Light'), ('Bright Light');

