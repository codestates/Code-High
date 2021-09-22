import 'dotenv/config';

export default {
   type: "mysql",
   host: process.env.DATABASE_HOST,
   port: process.env.DATABASE_PORT,
   username: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   synchronize: true,
   logging: false,
   // entities: [
   //    "src/entity/**/*.ts"
   // ],
   // migrations: [
   //    "src/migration/**/*.ts"
   // ],
   // subscribers: [
   //    "src/subscriber/**/*.ts"
   // ],
   entities: [
      "./src/entity/**/*.js"
   ],
   migrations: [
      "./src/migration/**/*.js"
   ],
   subscribers: [
      "./src/subscriber/**/*.js"
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   }
}