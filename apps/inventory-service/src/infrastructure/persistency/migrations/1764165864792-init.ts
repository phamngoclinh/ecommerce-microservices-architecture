import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1764165864792 implements MigrationInterface {
  name = 'Init1764165864792';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "inventory"."stock_reservation" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "order_id" integer,
                "reserved_qty" double precision NOT NULL,
                "status" text NOT NULL DEFAULT 'PENDING',
                "reserved_at" text NOT NULL DEFAULT now(),
                "expired_at" text,
                "released_at" text,
                "inventory_item_id" integer,
                CONSTRAINT "PK_a1f7c9841feb7e5744923efa2d2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_e27557ecaea787f8da87613073" ON "inventory"."stock_reservation" ("inventory_item_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "inventory"."inventory_item" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "product_id" integer,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_94f5cbcb5f280f2f30bd4a9fd90" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "inventory"."stock" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying,
                "updated_by" character varying,
                "on_hand_qty" double precision NOT NULL DEFAULT '0',
                "reserved_qty" double precision NOT NULL DEFAULT '0',
                "available_qty" double precision NOT NULL DEFAULT '0',
                "inventory_item_id" integer,
                CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_21a3fa7230ee2be099d14eda66" ON "inventory"."stock" ("inventory_item_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "inventory"."stock_reservation"
            ADD CONSTRAINT "FK_e27557ecaea787f8da87613073d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory"."inventory_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "inventory"."stock"
            ADD CONSTRAINT "FK_21a3fa7230ee2be099d14eda66d" FOREIGN KEY ("inventory_item_id") REFERENCES "inventory"."inventory_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "inventory"."stock" DROP CONSTRAINT "FK_21a3fa7230ee2be099d14eda66d"
        `);
    await queryRunner.query(`
            ALTER TABLE "inventory"."stock_reservation" DROP CONSTRAINT "FK_e27557ecaea787f8da87613073d"
        `);
    await queryRunner.query(`
            DROP INDEX "inventory"."IDX_21a3fa7230ee2be099d14eda66"
        `);
    await queryRunner.query(`
            DROP TABLE "inventory"."stock"
        `);
    await queryRunner.query(`
            DROP TABLE "inventory"."inventory_item"
        `);
    await queryRunner.query(`
            DROP INDEX "inventory"."IDX_e27557ecaea787f8da87613073"
        `);
    await queryRunner.query(`
            DROP TABLE "inventory"."stock_reservation"
        `);
  }
}
