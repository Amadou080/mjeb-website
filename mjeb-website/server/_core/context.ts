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
  
  // Parse cookies manually for maximum reliability
  const cookies = new Map<string, string>();
  cookieHeader.split(";").forEach(c => {
    const [key, value] = c.trim().split("=");
    if (key && value) cookies.set(key, value);
  });

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
