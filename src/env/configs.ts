import { join } from "path";

const commomKeys = {
  drizzleSchemaFiles: [
    'src/core/todo/schemas/drizzle-todo-table.schema.ts'
    // join('src', 'core', 'todo', 'schemas', 'drizzle-todo-table.schema.ts'), // !
  ],
  drizzleMigrationsFolder: join('src', 'db', 'drizzle', 'migrations'),
}

const envConfigs = {
  development: {
    databaseFile: 'dev.db.sqlite3',
    currentEnv: 'development',
    ...commomKeys,
  },
  production: {
    databaseFile: 'prod.db.sqlite3',
    currentEnv: 'production',
    ...commomKeys,
  },
  test: {
    databaseFile: '.int.test.db.sqlite3',
    currentEnv: 'test',
    ...commomKeys,
  },
  e2e: {
    databaseFile: 'e2e.test.db.sqlite3',
    currentEnv: 'e2e',
    ...commomKeys,
  },
} as const;

type ConfigsByEnv = {
  readonly databaseFile: string;
  readonly currentEnv: keyof EnvConfigs;
} & typeof commomKeys;

type EnvConfigs = typeof envConfigs;
type AllowedEnvKeys = keyof EnvConfigs;

function isValidEnv(env: string): env is AllowedEnvKeys {
  return Object.keys(envConfigs).includes(env);
}

export function checkEnv(): AllowedEnvKeys {
  const currentEnv = process.env.CURRENT_ENV;

  if (!currentEnv || !isValidEnv(currentEnv)) {
    throw new Error('Verifique os .env* e os valores em src/env/configs.ts');
  }

  return currentEnv;
}

export function getFullEnv() {
  const currentEnv = checkEnv();
  return envConfigs[currentEnv];
}

export function getEnv<C extends keyof ConfigsByEnv>(key: C) {
  const currentEnv = checkEnv();
  const value = envConfigs[currentEnv][key];
  return value;
}
