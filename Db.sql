-- -------------------------------------------------------------
-- TablePlus 5.3.8(500)
--
-- https://tableplus.com/
--
-- Database: verceldb
-- Generation Time: 2023-07-12 14:34:46.8120
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table Definition
CREATE TABLE "public"."auth_user" (
    "id" text NOT NULL,
    "username" text NOT NULL,
    "user_type" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS hits_id_seq;

-- Table Definition
CREATE TABLE "public"."hits" (
    "id" int4 NOT NULL DEFAULT nextval('hits_id_seq'::regclass),
    "link_id" uuid NOT NULL,
    "created_on" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."links" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "shortlink" text NOT NULL,
    "created_by" text NOT NULL,
    "url" text NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."links" ADD FOREIGN KEY ("created_by") REFERENCES "public"."auth_user"("id");

CREATE INDEX idx_links_created_by ON links(created_by);
CREATE INDEX idx_hits_link_id ON hits(link_id);