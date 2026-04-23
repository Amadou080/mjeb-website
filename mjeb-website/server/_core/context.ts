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
  console.log("[Context] Cookie header present:", !!cookieHeader);
  
  const cookies = (sdk as any).parseCookies(cookieHeader);
  const sessionCookie = cookies.get(COOKIE_NAME);
  console.log("[Context] Session cookie found:", !!sessionCookie);

  if (sessionCookie) {
    try {
      const session = await sdk.verifySession(sessionCookie);
      console.log("[Context] Session verified:", session ? session.openId : "failed");
      
      if (session) {
        if (session.openId === "admin-user-openid") {
          user = {
            id: 999999, // Use a number for ID to be safe
            openId: session.openId,
            name: session.name || "MJEB Admin",
            role: "admin",
            email: "admin@mjeb.org"
          } as any;
          console.log("[Context] Admin user detected and set");
        } else {
          user = await sdk.authenticateRequest(opts.req);
          console.log("[Context] Regular user authenticated:", user?.id);
        }
      }
    } catch (error) {
      console.error("[Context] Auth error:", error);
      user = null;
    }
  } else {
    console.log("[Context] No session cookie, user remains null");
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
