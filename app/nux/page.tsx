import { notFound } from "next/navigation"
import { AdminUserForm } from "./form"
import { kysely } from "@/lib/db"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Page() {
  // If we have >0 users in the database, return a 404.
  const users = await kysely.selectFrom("auth_user").limit(1).execute()
  if (users.length > 0) {
    notFound()
  }

  return (
    <>
      <Card className="mx-auto mt-12 w-[36rem]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Please create an admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminUserForm />
        </CardContent>
      </Card>
    </>
  )
}
