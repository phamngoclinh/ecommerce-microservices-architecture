import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1764164193242 implements MigrationInterface {
  name = 'Init1764164193242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "order"."order_items" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "inventory_item_id" integer NOT NULL,
                "product_id" integer NOT NULL,
                "product_name" character varying NOT NULL,
                "quantity" integer NOT NULL DEFAULT '1',
                "unit_price" numeric(15, 2) NOT NULL,
                "line_amount" numeric(15, 2) NOT NULL DEFAULT '0',
                "order_id" integer,
                CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "order"."orders" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "status" text NOT NULL DEFAULT 'PENDING',
                "sub_amount" numeric(15, 2) NOT NULL DEFAULT '0',
                "discount" numeric(5, 2) NOT NULL DEFAULT '0',
                "vat" numeric(5, 2) NOT NULL DEFAULT '0',
                "amount" numeric(15, 2) NOT NULL DEFAULT '0',
                "total_amount" numeric(15, 2) NOT NULL DEFAULT '0',
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "order"."carts" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "product_id" integer NOT NULL,
                "product_name" character varying,
                "quantity" integer NOT NULL DEFAULT '1',
                "unit_price" numeric(15, 2) NOT NULL,
                "line_amount" numeric(15, 2) NOT NULL DEFAULT '0',
                CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "order"."order_items"
            ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "order"."orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "order"."order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"
        `);
    await queryRunner.query(`
            DROP TABLE "order"."carts"
        `);
    await queryRunner.query(`
            DROP TABLE "order"."orders"
        `);
    await queryRunner.query(`
            DROP TABLE "order"."order_items"
        `);
  }
}
