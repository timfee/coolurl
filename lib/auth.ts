import { pg } from "@lucia-auth/adapter-postgresql"
import { createPool } from "@vercel/postgres"

import lucia from "lucia-auth"
import { nextjs } from "lucia-auth/middleware"

export const auth = lucia({
  adapter: pg(createPool()),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      userType: userData.user_type,
    }
  },
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  experimental: {
    debugMode: true,
  },
  middleware: nextjs(),
})
