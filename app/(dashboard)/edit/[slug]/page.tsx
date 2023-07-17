import { LinkEditor } from "./form"
import { kysely } from "@/lib/db"

export type EditorFields = NonNullable<Awaited<ReturnType<typeof getLinkData>>>

async function getLinkData(slug: string) {
  return kysely
    .selectFrom("links")
    .select(["shortlink", "url", "id"])
    .where("shortlink", "=", slug)
    .executeTakeFirst()
}

export default async function Editor({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const data = (await getLinkData(slug)) ?? {
    id: "NEW_LINK",
    shortlink: "",
    url: "",
  }

  return <LinkEditor data={data} />
}
