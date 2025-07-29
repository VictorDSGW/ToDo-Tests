import { getFullEnv } from "@/env/configs";

export function sanitizeStr(s: string): string {
    return !s || typeof s !== 'string' ? '' : s.trim().normalize();
}

// console.log('CURRENT_ENV =', process.env.CURRENT_ENV);
// npx tsx src/utils/sanitize-str.ts // CURRENT_ENV = undefined
// npx dotenv -e .env.test -- tsx src/utils/sanitize-str.ts // CURRENT_ENV = test

const env = getFullEnv();
console.log(env); 
// npx dotenv -e .env.test -- tsx src/utils/sanitize-str.ts // { databaseFile: '.int.test.db.sqlite3', currentEnv: 'test' }
// npx dotenv -e .env.production -- tsx src/utils/sanitize-str.ts // { databaseFile: 'prod.db.sqlite3', currentEnv: 'production' }
// npx dotenv -e .env.development -- tsx src/utils/sanitize-str.ts // { databaseFile: 'dev.db.sqlite3', currentEnv: 'development' }
