import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761798279429 implements MigrationInterface {
    name = 'Init1761798279429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payment_methods" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "provider" varchar CHECK(
                    "provider" IN ('VNPAY', 'MOMO', 'ZALOPAY', 'PAYPAL', 'STRIPE', 'COD')
                ) NOT NULL,
                "display_name" varchar NOT NULL,
                "is_active" boolean NOT NULL DEFAULT (1)
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payment_transactions" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "type" varchar CHECK(
                    "type" IN ('REQUEST', 'RESPONSE', 'CALLBACK', 'REFUND', 'RETRY')
                ) NOT NULL,
                "payload" json,
                "external_txn_id" varchar,
                "message" varchar,
                "payment_id" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payments" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "orderId" integer NOT NULL,
                "status" varchar CHECK(
                    "status" IN (
                        'PENDING',
                        'SUCCESS',
                        'FAILED',
                        'CANCELLED',
                        'REFUNDED'
                    )
                ) NOT NULL DEFAULT ('PENDING'),
                "amount" decimal(15, 2) NOT NULL,
                "currency" varchar,
                "transaction_id" varchar,
                "method_id" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "refunds" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "amount" decimal(15, 2) NOT NULL,
                "reason" varchar,
                "external_refund_id" varchar,
                "payment_id" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_payment_transactions" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "type" varchar CHECK(
                    "type" IN ('REQUEST', 'RESPONSE', 'CALLBACK', 'REFUND', 'RETRY')
                ) NOT NULL,
                "payload" json,
                "external_txn_id" varchar,
                "message" varchar,
                "payment_id" integer,
                CONSTRAINT "FK_1f4dd90aece142a3a591cf4334b" FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_payment_transactions"(
                    "id",
                    "created_at",
                    "updated_at",
                    "type",
                    "payload",
                    "external_txn_id",
                    "message",
                    "payment_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "type",
                "payload",
                "external_txn_id",
                "message",
                "payment_id"
            FROM "payment_transactions"
        `);
        await queryRunner.query(`
            DROP TABLE "payment_transactions"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_payment_transactions"
                RENAME TO "payment_transactions"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_payments" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "orderId" integer NOT NULL,
                "status" varchar CHECK(
                    "status" IN (
                        'PENDING',
                        'SUCCESS',
                        'FAILED',
                        'CANCELLED',
                        'REFUNDED'
                    )
                ) NOT NULL DEFAULT ('PENDING'),
                "amount" decimal(15, 2) NOT NULL,
                "currency" varchar,
                "transaction_id" varchar,
                "method_id" integer,
                CONSTRAINT "FK_9200663684b981a7bd078895a0c" FOREIGN KEY ("method_id") REFERENCES "payment_methods" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_payments"(
                    "id",
                    "created_at",
                    "updated_at",
                    "orderId",
                    "status",
                    "amount",
                    "currency",
                    "transaction_id",
                    "method_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "orderId",
                "status",
                "amount",
                "currency",
                "transaction_id",
                "method_id"
            FROM "payments"
        `);
        await queryRunner.query(`
            DROP TABLE "payments"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_payments"
                RENAME TO "payments"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_refunds" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "amount" decimal(15, 2) NOT NULL,
                "reason" varchar,
                "external_refund_id" varchar,
                "payment_id" integer,
                CONSTRAINT "FK_7f48aa5d56c42aeb495db016683" FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_refunds"(
                    "id",
                    "created_at",
                    "updated_at",
                    "amount",
                    "reason",
                    "external_refund_id",
                    "payment_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "amount",
                "reason",
                "external_refund_id",
                "payment_id"
            FROM "refunds"
        `);
        await queryRunner.query(`
            DROP TABLE "refunds"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_refunds"
                RENAME TO "refunds"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "refunds"
                RENAME TO "temporary_refunds"
        `);
        await queryRunner.query(`
            CREATE TABLE "refunds" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "amount" decimal(15, 2) NOT NULL,
                "reason" varchar,
                "external_refund_id" varchar,
                "payment_id" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "refunds"(
                    "id",
                    "created_at",
                    "updated_at",
                    "amount",
                    "reason",
                    "external_refund_id",
                    "payment_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "amount",
                "reason",
                "external_refund_id",
                "payment_id"
            FROM "temporary_refunds"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_refunds"
        `);
        await queryRunner.query(`
            ALTER TABLE "payments"
                RENAME TO "temporary_payments"
        `);
        await queryRunner.query(`
            CREATE TABLE "payments" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "orderId" integer NOT NULL,
                "status" varchar CHECK(
                    "status" IN (
                        'PENDING',
                        'SUCCESS',
                        'FAILED',
                        'CANCELLED',
                        'REFUNDED'
                    )
                ) NOT NULL DEFAULT ('PENDING'),
                "amount" decimal(15, 2) NOT NULL,
                "currency" varchar,
                "transaction_id" varchar,
                "method_id" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "payments"(
                    "id",
                    "created_at",
                    "updated_at",
                    "orderId",
                    "status",
                    "amount",
                    "currency",
                    "transaction_id",
                    "method_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "orderId",
                "status",
                "amount",
                "currency",
                "transaction_id",
                "method_id"
            FROM "temporary_payments"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_payments"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment_transactions"
                RENAME TO "temporary_payment_transactions"
        `);
        await queryRunner.query(`
            CREATE TABLE "payment_transactions" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "type" varchar CHECK(
                    "type" IN ('REQUEST', 'RESPONSE', 'CALLBACK', 'REFUND', 'RETRY')
                ) NOT NULL,
                "payload" json,
                "external_txn_id" varchar,
                "message" varchar,
                "payment_id" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "payment_transactions"(
                    "id",
                    "created_at",
                    "updated_at",
                    "type",
                    "payload",
                    "external_txn_id",
                    "message",
                    "payment_id"
                )
            SELECT "id",
                "created_at",
                "updated_at",
                "type",
                "payload",
                "external_txn_id",
                "message",
                "payment_id"
            FROM "temporary_payment_transactions"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_payment_transactions"
        `);
        await queryRunner.query(`
            DROP TABLE "refunds"
        `);
        await queryRunner.query(`
            DROP TABLE "payments"
        `);
        await queryRunner.query(`
            DROP TABLE "payment_transactions"
        `);
        await queryRunner.query(`
            DROP TABLE "payment_methods"
        `);
    }

}
