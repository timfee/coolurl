/// <reference types="lucia" />
declare namespace Lucia {
  type UserAttributes = {
    username: string
    user_type: "user" | "admin"
  }
}
