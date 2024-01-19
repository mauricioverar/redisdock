import "dotenv/config"

export const cfg = {
  API_BASE_URL: process.env.API_BASE_URL,
  MYSQLDB_LOCAL_PORT: process.env.MYSQLDB_LOCAL_PORT,
  MYSQLDB_HOST: process.env.MYSQLDB_HOST,
  MYSQLDB_USER: process.env.MYSQLDB_USER,
  MYSQLDB_ROOT_PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
  MYSQLDB_DATABASE: process.env.MYSQLDB_DATABASE,
}
