"use client"

import { ColumnDef } from "@tanstack/react-table"

import { getDashboardFor } from "@/lib/db"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

export type ColumnType = Awaited<ReturnType<typeof getDashboardFor>>[0]

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "shortlink",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shortlink" />
    ),
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    accessorFn: ({ created_at }) => created_at.toLocaleDateString(),
    sortingFn: "datetime",
    enableSorting: true,
  },
  {
    accessorKey: "hit_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hits" />
    ),
    enableSorting: true,
  },
]
