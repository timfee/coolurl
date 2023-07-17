import type { ColumnType } from "kysely"

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export type Int8 = ColumnType<
  string,
  string | number | bigint,
  string | number | bigint
>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface AuthKey {
  id: string
  user_id: string
  primary_key: boolean
  hashed_password: string | null
  expires: Int8 | null
}

export interface AuthSession {
  id: string
  user_id: string
  active_expires: Int8
  idle_expires: Int8
}

export interface AuthUser {
  id: string
  username: string
  user_type: string
}

export interface Hits {
  id: Generated<number>
  link_id: string
  created_on: Generated<Timestamp>
}

export interface Links {
  id: Generated<string>
  shortlink: string
  created_by: string
  url: string
  created_at: Generated<Timestamp>
}

export interface DB {
  auth_key: AuthKey
  auth_session: AuthSession
  auth_user: AuthUser
  hits: Hits
  links: Links
}
