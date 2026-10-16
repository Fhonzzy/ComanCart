#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/f2de19d5d375785ee5d1cc40bd8e385ec92d0e1c1006fd838cfdff03867e842a/contract';
import endContract from '../../snapshots/f2de19d5d375785ee5d1cc40bd8e385ec92d0e1c1006fd838cfdff03867e842a/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Category',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Product',
        columns: [
          col('categorySlug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('colors', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('images', 'json', { notNull: true, codecRef: { codecId: 'pg/json@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('price', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('shortDescription', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sizes', 'text[]', { notNull: true, codecRef: { codecId: 'pg/text@1', many: true } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Product_colors_elem_not_null_7d4593f4',
            'array_position("colors", NULL) IS NULL',
          ),
          checkExpression(
            'Product_sizes_elem_not_null_099c54be',
            'array_position("sizes", NULL) IS NULL',
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_slug_key',
        columns: ['slug'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Product',
        index: 'Product_categorySlug_idx_d7d8d50f',
        columns: ['categorySlug'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Product',
        foreignKey: {
          name: 'Product_categorySlug_fkey',
          columns: ['categorySlug'],
          references: { schema: 'public', table: 'Category', columns: ['slug'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
