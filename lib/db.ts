import { createKysely } from "@vercel/postgres-kysely"
import { Kysely } from "kysely"
import { DB } from "../types"

declare global {
  // eslint-disable-next-line no-var
  var kysely: Kysely<DB> | undefined
}

export const kysely = global.kysely || createKysely()

if (process.env.NODE_ENV !== "production") {
  global.kysely = kysely
}

export async function getDashboardFor(user_id: string) {
  return kysely
    .selectFrom("links")
    .innerJoin("auth_user", "auth_user.id", "links.created_by")
    .leftJoin("hits", "hits.link_id", "links.id")
    .select(["shortlink", "created_at", "created_by", "url"])
    .where("created_by", "=", user_id)
    .select("auth_user.username")
    .select(({ fn }) => fn.count<number>("hits.id").as("hit_count"))
    .groupBy([
      "shortlink",
      "created_at",
      "created_by",
      "url",
      "auth_user.username",
    ])
    .execute()
}
