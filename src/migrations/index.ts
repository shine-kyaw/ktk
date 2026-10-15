import * as migration_20260923_064332_initial from './20260923_064332_initial';
import * as migration_20261009_120000_customer_copy from './20261009_120000_customer_copy';

export const migrations = [
  {
    up: migration_20260923_064332_initial.up,
    down: migration_20260923_064332_initial.down,
    name: '20260923_064332_initial'
  },
  {
    up: migration_20261009_120000_customer_copy.up,
    down: migration_20261009_120000_customer_copy.down,
    name: '20261009_120000_customer_copy'
  },
];
