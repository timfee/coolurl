"use server"

import { EditorFields } from "./page"
import { auth } from "@/lib/auth"
import { kysely } from "@/lib/db"

export async function upsertLink({ id, shortlink, url }: EditorFields) {
  const links = await kysely
    .selectFrom("links")
    .where("shortlink", "=", shortlink)
    .where("id", "!=", id)
    .limit(1)
    .execute()
  if (links.length > 0) {
    throw new Error("Already installed")
  }

  return kysely
    .insertInto("links")
    .onDuplicateKeyUpdate((fun) => ({}))
    .values({
      shortlink,
      url,
      created_by: "admin",
    })
    .executeTakeFirstOrThrow()
}
