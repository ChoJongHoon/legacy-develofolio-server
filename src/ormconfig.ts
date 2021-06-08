// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { ConnectionOptions } from 'typeorm'

const port: number = Number.parseInt(process.env.DB_PORT)

const ormconfig: ConnectionOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: true,
	entities: ['dist/**/*.model.js'],
	migrations: ['dist/migration/*.js'],
	subscribers: ['dist/**/*.subscriber.js'],
	cli: {
		migrationsDir: 'src/migration',
	},
}

export = ormconfig
