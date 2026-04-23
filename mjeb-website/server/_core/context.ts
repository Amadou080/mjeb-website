import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { COOKIE_NAME } from "@shared/const";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  const cookieHeader = opts.req.headers.cookie || "";
  const cookies = (sdk as any).parseCookies(cookieHeader);
  const sessionCookie = cookies.get(COOKIE_NAME);

  if (sessionCookie) {
    try {
      const session = await sdk.verifySession(sessionCookie);
      if (session) {
        if (session.openId === "admin-user-openid") {
          user = {
            id: "admin",
            name: session.name || "MJEB Admin",
            role: "admin",
            email: "admin@mjeb.org"
          } as any;
        } else {
          user = await sdk.authenticateRequest(opts.req);
        }
      }
    } catch (error) {
      console.error("[Context] Auth error:", error);
      user = null;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
