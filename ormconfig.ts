import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
   type: "mysql",
   host: process.env.DATABASE_HOST,
   port: parseInt(process.env.DATABASE_PORT),
   username: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   synchronize: false,
   logging: false,
   entities: process.env.NODE_ENV === 'dev' ? ["src/entity/**/*.ts"] : ["dist/src/entity/**/*{.js,.ts}"],
   migrations: [
      "src/migration/**/*.js"
   ],
   subscribers: [
      "src/subscriber/**/*.js"
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   }
}

export default config;