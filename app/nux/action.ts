"use server"

import { FormSchema } from "./form"
import { auth } from "@/lib/auth"
import { kysely } from "@/lib/db"

export async function createAdminUser({ password, username }: FormSchema) {
  const users = await kysely.selectFrom("auth_user").limit(1).execute()
  if (users.length > 0) {
    throw new Error("Already installed")
  }
  const user = await auth.createUser({
    attributes: {
      username,
      user_type: "admin",
    },
    primaryKey: {
      password,
      providerId: "username",
      providerUserId: username,
    },
  })
  return user.userId
}
