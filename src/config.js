import { config } from "dotenv"
config()

export const API_BASE_URL = process.env.API_BASE_URL
export const MYSQLDB_LOCAL_PORT = process.env.MYSQLDB_LOCAL_PORT

export const MYSQLDB_HOST = process.env.MYSQLDB_HOST
export const MYSQLDB_USER = process.env.MYSQLDB_USER
export const MYSQLDB_ROOT_PASSWORD = process.env.MYSQLDB_ROOT_PASSWORD
export const MYSQLDB_DATABASE = process.env.MYSQLDB_DATABASE



