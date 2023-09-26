CREATE TYPE "gender_type" AS ENUM (
  'male',
  'female'
);

CREATE TYPE "user_type" AS ENUM (
  'plattform staff',
  'seller',
  'buyer',
  'seller and buyer'
);

CREATE TYPE "currency" AS ENUM (
  'Rp',
  'US',
  'EUR'
);

CREATE TYPE "order_status" AS ENUM (
  'waiting for payment',
  'in process',
  'successful',
  'failed'
);

CREATE TYPE "option" AS ENUM (
  'e_bank_transfer',
  'visa',
  'mastercard',
  'paypal'
);

CREATE TABLE "user" (
  "id" bigserial PRIMARY KEY,
  "title" varchar,
  "fullname" varchar,
  "gender" gender_type,
  "birth_date" varchar,
  "email" varchar,
  "telephone" int,
  "type" user_type,
  "created_at" timestamp
);

CREATE TABLE "merchant" (
  "id" bigserial PRIMARY KEY,
  "admin_id" int,
  "name" varchar,
  "description" text,
  "created_at" timestamp
);

CREATE TABLE "country" (
  "code" varchar(3) PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user_address" (
  "id" bigserial PRIMARY KEY,
  "user_id" int,
  "street_name" varchar,
  "street_number" int,
  "postcode" int,
  "city" varchar,
  "province" varchar,
  "country_code" varchar
);

CREATE TABLE "product" (
  "id" bigserial PRIMARY KEY,
  "category_id" int,
  "merchant_id" int,
  "name" varchar,
  "price" currency,
  "unit_available" int,
  "created_at" timestamp
);

CREATE TABLE "category" (
  "id" bigserial PRIMARY KEY,
  "name" varchar,
  "parent_id" int
);

CREATE TABLE "order" (
  "id" bigserial PRIMARY KEY,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "order_item" (
  "order_id" int,
  "product_id" int,
  "quantity" int,
  "payment_id" int,
  "status" order_status
);

CREATE TABLE "payment" (
  "id" bigserial PRIMARY KEY,
  "method" option
);

ALTER TABLE "merchant" ADD FOREIGN KEY ("admin_id") REFERENCES "user" ("id");

ALTER TABLE "user_address" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_address" ADD FOREIGN KEY ("country_code") REFERENCES "country" ("code");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("merchant_id") REFERENCES "merchant" ("id");

ALTER TABLE "category" ADD FOREIGN KEY ("parent_id") REFERENCES "category" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("payment_id") REFERENCES "payment" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");
