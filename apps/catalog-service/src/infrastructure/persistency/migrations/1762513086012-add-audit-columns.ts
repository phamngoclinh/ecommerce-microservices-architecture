import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditColumns1762513086012 implements MigrationInterface {
    name = 'AddAuditColumns1762513086012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_products" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar(255) NOT NULL,
                "price" decimal(15, 2) NOT NULL,
                "status" varchar CHECK("status" IN ('ACTIVE', 'INACTIVE', 'DRAFT')) NOT NULL DEFAULT ('ACTIVE'),
                "created_by" varchar,
                "updated_by" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_products"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "price",
                    "status"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "price",
                "status"
            FROM "products"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_products"
                RENAME TO "products"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_products" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar(255) NOT NULL,
                "price" decimal(15, 2) NOT NULL,
                "status" varchar CHECK("status" IN ('ACTIVE', 'INACTIVE', 'DRAFT')) NOT NULL DEFAULT ('ACTIVE'),
                "created_by" varchar,
                "updated_by" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_products"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "price",
                    "status",
                    "created_by",
                    "updated_by"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "price",
                "status",
                "created_by",
                "updated_by"
            FROM "products"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_products"
                RENAME TO "products"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products"
                RENAME TO "temporary_products"
        `);
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar(255) NOT NULL,
                "price" decimal(15, 2) NOT NULL,
                "status" varchar CHECK("status" IN ('ACTIVE', 'INACTIVE', 'DRAFT')) NOT NULL DEFAULT ('ACTIVE'),
                "created_by" varchar,
                "updated_by" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "products"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "price",
                    "status",
                    "created_by",
                    "updated_by"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "price",
                "status",
                "created_by",
                "updated_by"
            FROM "temporary_products"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_products"
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
                RENAME TO "temporary_products"
        `);
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "name" varchar(255) NOT NULL,
                "price" decimal(15, 2) NOT NULL,
                "status" varchar CHECK("status" IN ('ACTIVE', 'INACTIVE', 'DRAFT')) NOT NULL DEFAULT ('ACTIVE')
            )
        `);
        await queryRunner.query(`
            INSERT INTO "products"(
                    "id",
                    "created_at",
                    "updated_at",
                    "name",
                    "price",
                    "status"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "name",
                "price",
                "status"
            FROM "temporary_products"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_products"
        `);
    }

}
