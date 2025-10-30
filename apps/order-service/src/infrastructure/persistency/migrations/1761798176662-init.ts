import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761798176662 implements MigrationInterface {
    name = 'Init1761798176662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "status" varchar CHECK(
                    "status" IN (
                        'PENDING',
                        'CONFIRMED',
                        'PAID',
                        'SHIPPED',
                        'COMPLETED'
                    )
                ) NOT NULL DEFAULT ('PENDING'),
                "sub_amount" decimal(15, 2) NOT NULL DEFAULT (0),
                "discount" decimal(5, 2) NOT NULL DEFAULT (0),
                "vat" decimal(5, 2) NOT NULL DEFAULT (0),
                "amount" decimal(15, 2) NOT NULL DEFAULT (0),
                "total_amount" decimal(15, 2) NOT NULL DEFAULT (0)
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "inventory_item_id" integer NOT NULL,
                "product_id" integer NOT NULL,
                "product_name" varchar NOT NULL,
                "quantity" integer NOT NULL DEFAULT (1),
                "unit_price" decimal(15, 2) NOT NULL,
                "line_amount" decimal(15, 2) NOT NULL DEFAULT (0),
                "order_id" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "carts" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "product_id" integer NOT NULL,
                "product_name" varchar,
                "quantity" integer NOT NULL DEFAULT (1),
                "unit_price" decimal(15, 2) NOT NULL,
                "line_amount" decimal(15, 2) NOT NULL DEFAULT (0)
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_order_items" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "inventory_item_id" integer NOT NULL,
                "product_id" integer NOT NULL,
                "product_name" varchar NOT NULL,
                "quantity" integer NOT NULL DEFAULT (1),
                "unit_price" decimal(15, 2) NOT NULL,
                "line_amount" decimal(15, 2) NOT NULL DEFAULT (0),
                "order_id" integer,
                CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_order_items"(
                    "id",
                    "created_at",
                    "updated_at",
                    "inventory_item_id",
                    "product_id",
                    "product_name",
                    "quantity",
                    "unit_price",
                    "line_amount",
                    "order_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "inventory_item_id",
                "product_id",
                "product_name",
                "quantity",
                "unit_price",
                "line_amount",
                "order_id"
            FROM "order_items"
        `);
        await queryRunner.query(`
            DROP TABLE "order_items"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_order_items"
                RENAME TO "order_items"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_items"
                RENAME TO "temporary_order_items"
        `);
        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "inventory_item_id" integer NOT NULL,
                "product_id" integer NOT NULL,
                "product_name" varchar NOT NULL,
                "quantity" integer NOT NULL DEFAULT (1),
                "unit_price" decimal(15, 2) NOT NULL,
                "line_amount" decimal(15, 2) NOT NULL DEFAULT (0),
                "order_id" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "order_items"(
                    "id",
                    "created_at",
                    "updated_at",
                    "inventory_item_id",
                    "product_id",
                    "product_name",
                    "quantity",
                    "unit_price",
                    "line_amount",
                    "order_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "inventory_item_id",
                "product_id",
                "product_name",
                "quantity",
                "unit_price",
                "line_amount",
                "order_id"
            FROM "temporary_order_items"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_order_items"
        `);
        await queryRunner.query(`
            DROP TABLE "carts"
        `);
        await queryRunner.query(`
            DROP TABLE "order_items"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
    }

}
