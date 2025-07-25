import { auth } from "./app/_api/auth";

export const middleware = auth;

export const config = { matcher: ["/account"] };
