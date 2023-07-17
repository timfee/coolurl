import { columns } from "./columns"
import { DataTable } from "./table"
import { getDashboardFor } from "@/lib/db"

export default async function Home() {
  const data = await getDashboardFor("mNyMvDMzMYFa7dt")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable columns={columns} data={data} />
    </main>
  )
}
