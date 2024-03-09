import parseDbUrl from 'parse-database-url'
import dotenv from 'dotenv'

dotenv.config()

export namespace Knex {
    export const config = {
        client: "mysql2",
        connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        },
        pool: {
        min: 2,
        max: 100,
        },
        migrations: {
            tableName: 'KnexMigrations',
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeders'
        },
    }
}

export namespace AppConfig {
    export const config = {
        API_PREFIX: process.env.API_PREFIX,
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 4000,
        SECRET_KEY: process.env.SECRET_KEY,
        JWT_EXPIRES: process.env.JWT_EXPIRES,
        PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    }
}

export namespace Redis {
    export const url = process.env.REDIS_URL
}

export default {Knex, Redis, AppConfig}