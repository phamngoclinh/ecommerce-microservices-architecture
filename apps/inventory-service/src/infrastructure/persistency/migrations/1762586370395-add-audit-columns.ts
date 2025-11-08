import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditColumns1762586370395 implements MigrationInterface {
    name = 'AddAuditColumns1762586370395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_e27557ecaea787f8da87613073"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_stock_reservation" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "order_id" integer,
                "reserved_qty" float NOT NULL,
                "status" varchar CHECK(
                    "status" IN ('PENDING', 'CONFIRMED', 'RELEASED', 'CANCELLED')
                ) NOT NULL DEFAULT ('PENDING'),
                "reserved_at" text NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                "expired_at" text,
                "released_at" text,
                "inventory_item_id" integer,
                "created_by" varchar,
                "updated_by" varchar,
                CONSTRAINT "FK_e27557ecaea787f8da87613073d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_stock_reservation"(
                    "id",
                    "created_at",
                    "updated_at",
                    "order_id",
                    "reserved_qty",
                    "status",
                    "reserved_at",
                    "expired_at",
                    "released_at",
                    "inventory_item_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "order_id",
                "reserved_qty",
                "status",
                "reserved_at",
                "expired_at",
                "released_at",
                "inventory_item_id"
            FROM "stock_reservation"
        `);
        await queryRunner.query(`
            DROP TABLE "stock_reservation"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_stock_reservation"
                RENAME TO "stock_reservation"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e27557ecaea787f8da87613073" ON "stock_reservation" ("inventory_item_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_inventory_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "product_id" integer,
                "is_active" boolean NOT NULL DEFAULT (1),
                "created_by" varchar,
                "updated_by" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_inventory_item"(
                    "id",
                    "created_at",
                    "updated_at",
                    "product_id",
                    "is_active"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "product_id",
                "is_active"
            FROM "inventory_item"
        `);
        await queryRunner.query(`
            DROP TABLE "inventory_item"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_inventory_item"
                RENAME TO "inventory_item"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_21a3fa7230ee2be099d14eda66"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_stock" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "on_hand_qty" float NOT NULL DEFAULT (0),
                "reserved_qty" float NOT NULL DEFAULT (0),
                "available_qty" float NOT NULL DEFAULT (0),
                "inventory_item_id" integer,
                "created_by" varchar,
                "updated_by" varchar,
                CONSTRAINT "FK_21a3fa7230ee2be099d14eda66d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_stock"(
                    "id",
                    "created_at",
                    "updated_at",
                    "on_hand_qty",
                    "reserved_qty",
                    "available_qty",
                    "inventory_item_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "on_hand_qty",
                "reserved_qty",
                "available_qty",
                "inventory_item_id"
            FROM "stock"
        `);
        await queryRunner.query(`
            DROP TABLE "stock"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_stock"
                RENAME TO "stock"
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_21a3fa7230ee2be099d14eda66" ON "stock" ("inventory_item_id")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e27557ecaea787f8da87613073"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_stock_reservation" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "order_id" integer,
                "reserved_qty" float NOT NULL,
                "status" varchar CHECK(
                    "status" IN ('PENDING', 'CONFIRMED', 'RELEASED', 'CANCELLED')
                ) NOT NULL DEFAULT ('PENDING'),
                "reserved_at" text NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                "expired_at" text,
                "released_at" text,
                "inventory_item_id" integer,
                "created_by" varchar,
                "updated_by" varchar,
                CONSTRAINT "FK_e27557ecaea787f8da87613073d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_stock_reservation"(
                    "id",
                    "created_at",
                    "updated_at",
                    "order_id",
                    "reserved_qty",
                    "status",
                    "reserved_at",
                    "expired_at",
                    "released_at",
                    "inventory_item_id",
                    "created_by",
                    "updated_by"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "order_id",
                "reserved_qty",
                "status",
                "reserved_at",
                "expired_at",
                "released_at",
                "inventory_item_id",
                "created_by",
                "updated_by"
            FROM "stock_reservation"
        `);
        await queryRunner.query(`
            DROP TABLE "stock_reservation"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_stock_reservation"
                RENAME TO "stock_reservation"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e27557ecaea787f8da87613073" ON "stock_reservation" ("inventory_item_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_e27557ecaea787f8da87613073"
        `);
        await queryRunner.query(`
            ALTER TABLE "stock_reservation"
                RENAME TO "temporary_stock_reservation"
        `);
        await queryRunner.query(`
            CREATE TABLE "stock_reservation" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "order_id" integer,
                "reserved_qty" float NOT NULL,
                "status" varchar CHECK(
                    "status" IN ('PENDING', 'CONFIRMED', 'RELEASED', 'CANCELLED')
                ) NOT NULL DEFAULT ('PENDING'),
                "reserved_at" text NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                "expired_at" text,
                "released_at" text,
                "inventory_item_id" integer,
                "created_by" varchar,
                "updated_by" varchar,
                CONSTRAINT "FK_e27557ecaea787f8da87613073d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "stock_reservation"(
                    "id",
                    "created_at",
                    "updated_at",
                    "order_id",
                    "reserved_qty",
                    "status",
                    "reserved_at",
                    "expired_at",
                    "released_at",
                    "inventory_item_id",
                    "created_by",
                    "updated_by"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "order_id",
                "reserved_qty",
                "status",
                "reserved_at",
                "expired_at",
                "released_at",
                "inventory_item_id",
                "created_by",
                "updated_by"
            FROM "temporary_stock_reservation"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_stock_reservation"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e27557ecaea787f8da87613073" ON "stock_reservation" ("inventory_item_id")
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_21a3fa7230ee2be099d14eda66"
        `);
        await queryRunner.query(`
            ALTER TABLE "stock"
                RENAME TO "temporary_stock"
        `);
        await queryRunner.query(`
            CREATE TABLE "stock" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "on_hand_qty" float NOT NULL DEFAULT (0),
                "reserved_qty" float NOT NULL DEFAULT (0),
                "available_qty" float NOT NULL DEFAULT (0),
                "inventory_item_id" integer,
                CONSTRAINT "FK_21a3fa7230ee2be099d14eda66d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "stock"(
                    "id",
                    "created_at",
                    "updated_at",
                    "on_hand_qty",
                    "reserved_qty",
                    "available_qty",
                    "inventory_item_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "on_hand_qty",
                "reserved_qty",
                "available_qty",
                "inventory_item_id"
            FROM "temporary_stock"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_stock"
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_21a3fa7230ee2be099d14eda66" ON "stock" ("inventory_item_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "inventory_item"
                RENAME TO "temporary_inventory_item"
        `);
        await queryRunner.query(`
            CREATE TABLE "inventory_item" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "product_id" integer,
                "is_active" boolean NOT NULL DEFAULT (1)
            )
        `);
        await queryRunner.query(`
            INSERT INTO "inventory_item"(
                    "id",
                    "created_at",
                    "updated_at",
                    "product_id",
                    "is_active"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "product_id",
                "is_active"
            FROM "temporary_inventory_item"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_inventory_item"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e27557ecaea787f8da87613073"
        `);
        await queryRunner.query(`
            ALTER TABLE "stock_reservation"
                RENAME TO "temporary_stock_reservation"
        `);
        await queryRunner.query(`
            CREATE TABLE "stock_reservation" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "order_id" integer,
                "reserved_qty" float NOT NULL,
                "status" varchar CHECK(
                    "status" IN ('PENDING', 'CONFIRMED', 'RELEASED', 'CANCELLED')
                ) NOT NULL DEFAULT ('PENDING'),
                "reserved_at" text NOT NULL DEFAULT (CURRENT_TIMESTAMP),
                "expired_at" text,
                "released_at" text,
                "inventory_item_id" integer,
                CONSTRAINT "FK_e27557ecaea787f8da87613073d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory_item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "stock_reservation"(
                    "id",
                    "created_at",
                    "updated_at",
                    "order_id",
                    "reserved_qty",
                    "status",
                    "reserved_at",
                    "expired_at",
                    "released_at",
                    "inventory_item_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "order_id",
                "reserved_qty",
                "status",
                "reserved_at",
                "expired_at",
                "released_at",
                "inventory_item_id"
            FROM "temporary_stock_reservation"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_stock_reservation"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e27557ecaea787f8da87613073" ON "stock_reservation" ("inventory_item_id")
        `);
    }

}
